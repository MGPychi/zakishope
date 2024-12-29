import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProductCategory, generateUploadSignature } from "../actions";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FILE_SIZE } from "@/constants";

const MAX_CHARS = 2000;

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(50)
    .max(MAX_CHARS),
  image: z.instanceof(File).optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file?: File;
  isExisting?: boolean;
};

const UpdateCategoryForm = ({
  initialData,
}: {
  initialData: FormValues & { imageUrl?: string };
}) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(
    initialData.imageUrl
      ? {
          id: "existing-image",
          url: initialData.imageUrl,
          isExisting: true,
        }
      : null
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      image: null,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: `${file.name} is not an image file`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `${file.name} is larger than 10MB`,
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = {
        id: Math.random().toString(36).substring(7),
        url: reader.result as string,
        file: file,
      };
      setImagePreview(preview);
      form.setValue("image", file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
  };

  const uploadToCloudinary = async (file: File) => {
    try {
      const { signature, timestamp, apiKey, cloudName } =
        await generateUploadSignature();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey.toString());
      formData.append("folder", "product_categories");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadResponse.json();
      return {
        url: data.secure_url,
        cloudId: data.public_id,
      };
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let imageUrl = imagePreview?.isExisting ? imagePreview.url : "";

      // Upload new image to Cloudinary if exists
      if (imagePreview?.file) {
        const uploadedImage = await uploadToCloudinary(imagePreview.file);
        imageUrl = uploadedImage.url;
      }

      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("imageUrls", JSON.stringify([imageUrl]));

      const response = await updateProductCategory(formData);

      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Category has been updated",
        });
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="resize-none"
                    placeholder="Category description"
                    {...field}
                  />
                </FormControl>
                <div>
                  <span className="text-gray-800 text-xs font-medium">
                    {form.getValues("description").length}/{MAX_CHARS}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const { value, onChange, ...restField } = field;
              void value;
              void onChange;
              return (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Card className="border-2 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview.url}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <div className="text-center">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                  document
                                    .getElementById("image-upload")
                                    ?.click();
                                }}
                              >
                                Choose Image
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                              PNG, JPG up to 10MB
                            </p>
                          </>
                        )}

                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                          {...restField}
                        />
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex px-8 gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>Update</span>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateCategoryForm;
