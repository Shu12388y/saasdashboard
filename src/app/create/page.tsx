'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Product {
  title: string;
  description: string;
  deployLink: string;
  image: File | null;
  type: string;
  price: number;
  productLink: File | null;
  category: string;
}

function ProductCreationPage() {
  const [product, setProduct] = useState<Product>({
    title: '',
    description: '',
    deployLink: '',
    image: null,
    type: '',
    price: 0,
    productLink: null,
    category: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productFileName, setProductFileName] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    setProduct((prev) => ({ ...prev, [name]: file }));

    if (name === 'image') {
      setImagePreview(URL.createObjectURL(file));
    } else if (name === 'productLink') {
      setProductFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product details:', product);
    alert('Product created successfully!');
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter product title"
                value={product.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                placeholder="Enter product type"
                value={product.type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Enter product catgory"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter product price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="deployLink">Deploy Link</Label>
              <Input
                id="deployLink"
                name="deployLink"
                placeholder="Enter deployment link"
                value={product.deployLink}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="productLink">Upload Product File</Label>
              <Input
                id="productLink"
                name="productLink"
                type="file"
                onChange={handleFileChange}
              />
              {productFileName && (
                <p className="mt-2">Uploaded File: {productFileName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-full h-64 object-cover rounded"
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Button type="submit" variant="default" className="w-full">
          Create Product
        </Button>
      </form>
    </div>
  );
}

export default ProductCreationPage;
