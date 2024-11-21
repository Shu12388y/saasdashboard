'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

interface Product {
  id: string;
  title: string;
  description: string;
  deployLink: string;
  image: string;
  type: string;
  price: number;
  productLink: string;
}

function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); // Mock data fetched from an API
  const [sortKey, setSortKey] = useState<keyof Product>('title');
  const [isAscending, setIsAscending] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Fetch products (replace with actual API call)
  useEffect(() => {
    const fetchProducts = async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          title: 'Product A',
          description: 'Description of Product A',
          deployLink: 'https://example.com/a',
          image: '/images/product-a.jpg',
          type: 'Type A',
          price: 50,
          productLink: '/files/product-a.zip',
        },
        {
          id: '2',
          title: 'Product B',
          description: 'Description of Product B',
          deployLink: 'https://example.com/b',
          image: '/images/product-b.jpg',
          type: 'Type B',
          price: 100,
          productLink: '/files/product-b.zip',
        },
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  // Handle Sorting
  const handleSort = (key: keyof Product) => {
    setSortKey(key);
    setIsAscending((prev) => (sortKey === key ? !prev : true));
    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) return isAscending ? -1 : 1;
      if (a[key] > b[key]) return isAscending ? 1 : -1;
      return 0;
    });
    setProducts(sorted);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    alert('Product deleted!');
  };

  // Handle Edit Save
  const handleSave = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
    setEditProduct(null);
    alert('Product updated!');
  };

  return (
    <div className="p-6 w-full h-full">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="mb-4 flex justify-between items-center">
        <Select onValueChange={(value) => handleSort(value as keyof Product)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Ascending' : 'Descending'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (editProduct) handleSave(editProduct);
                      }}
                      className="space-y-4"
                    >
                      <Label>Title</Label>
                      <Input
                        value={editProduct?.title || ''}
                        onChange={(e) =>
                          setEditProduct(
                            (prev) =>
                              prev && { ...prev, title: e.target.value },
                          )
                        }
                      />
                      <Label>Description</Label>
                      <Input
                        value={editProduct?.description || ''}
                        onChange={(e) =>
                          setEditProduct(
                            (prev) =>
                              prev && { ...prev, description: e.target.value },
                          )
                        }
                      />
                      <Label>Type</Label>
                      <Input
                        value={editProduct?.type || ''}
                        onChange={(e) =>
                          setEditProduct(
                            (prev) => prev && { ...prev, type: e.target.value },
                          )
                        }
                      />
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={editProduct?.price || 0}
                        onChange={(e) =>
                          setEditProduct(
                            (prev) =>
                              prev && {
                                ...prev,
                                price: parseFloat(e.target.value),
                              },
                          )
                        }
                      />
                      <DialogFooter>
                        <Button type="submit">Save</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllProductsPage;
