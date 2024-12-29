import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { updateProduct, generateUploadSignature } from "../actions";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FILES, MAX_FILE_SIZE } from "@/constants";
import { Switch } from "@/components/ui/switch";
import { getAllCategories } from "@/app/data/categories-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_CHARS = 2000;

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  description: z
    .string()
    .min(1, "Description is required")
    .min(50)
    .max(MAX_CHARS),
  images: z
    .array(z.any())
    .min(1, "At least one image is required")
    .max(MAX_FILES, `Maximum ${MAX_FILES} images allowed`),
  category: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof formSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file?: File;
  isExisting?: boolean;
};

const UpdateProductForm = ({
  initialData,
  categories,
}: {
  initialData: Omit<FormValues, "category"> & {
    category: { name: string; id: string };
  };
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}) => {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>(
    initialData.images.map((img) => ({
      ...img,
      isExisting: true,
    }))
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      category: initialData.category.id,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (imagePreviews.length + files.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Maximum ${MAX_FILES} images allowed`,
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map((file) => {
      return new Promise<ImagePreview>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: Math.random().toString(36).substring(7),
            url: reader.result as string,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((previews) => {
      setImagePreviews((prev) => [...prev, ...previews]);
      form.setValue("images", [...imagePreviews, ...previews]);
    });
  };

  const removeImage = (id: string) => {
    setImagePreviews((prev) => prev.filter((p) => p.id !== id));
    form.setValue(
      "images",
      imagePreviews.filter((p) => p.id !== id)
    );
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
      formData.append("folder", "products");

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
      // Upload new images to Cloudinary
      const uploadPromises = imagePreviews
        .filter((preview) => !preview.isExisting && preview.file)
        .map((preview) => uploadToCloudinary(preview.file!));

      const uploadedImages = await Promise.all(uploadPromises);

      // Combine existing and new images
      const allImages = [
        ...imagePreviews.filter((preview) => preview.isExisting),
        ...uploadedImages,
      ];

      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("isActive", String(data.isActive));
      formData.append("isFeatured", String(data.isFeatured));
      formData.append("category", data.category);
      formData.append(
        "imageUrls",
        JSON.stringify(allImages.map((img) => img.url))
      );
      formData.append(
        "cloudIds",
        JSON.stringify(allImages.map((img) => img.url))
      );

      const response = await updateProduct(formData);

      if (response?.data?.success) {
        toast({
          title: "Success",
          description: "Product has been updated",
        });
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
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
                  <Input placeholder="Product name" {...field} />
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
                    placeholder="Product description"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={initialData.category.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>
                      Make this product visible to customers
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Featured Product
                    </FormLabel>
                    <FormDescription>
                      Show this product in featured sections
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => {
              const { value, onChange, ...restField } = field;
              void value;
              void onChange;
              return (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <Card className="border-2 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                          {imagePreviews.map((preview) => (
                            <div key={preview.id} className="relative">
                              <img
                                src={preview.url}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-md"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => removeImage(preview.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {imagePreviews.length < MAX_FILES && (
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
                                Choose Images
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                              PNG, JPG up to 10MB (Maximum {MAX_FILES} images)
                            </p>
                          </>
                        )}

                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
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

export default UpdateProductForm;
