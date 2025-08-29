'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, searchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import { toast } from 'react-hot-toast';
import { Package, RotateCw, Grid, List } from 'lucide-react';
import { Product } from '@/types/product';

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch {
      setError('Failed to load products. Please try again later.');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProducts();
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    setCurrentPage(1);
    try {
      const results = await searchProducts(query);
      setFilteredProducts(results);

      if (results.length === 0) {
        toast.error('No products found matching your search');
      } else {
        toast.success(`Found ${results.length} product${results.length > 1 ? 's' : ''}`);
      }
    } catch {
      toast.error('Search failed');
      setFilteredProducts([]);
    }
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00CCCC]/5 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 bg-[#00CCCC] text-white px-6 py-3 rounded-xl hover:bg-[#00AAAA] transition-colors font-medium"
              >
                <RotateCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00CCCC]/5 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Package className="text-[#00CCCC]" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <div className="flex rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#00CCCC] text-white' : 'text-gray-600 hover:text-[#00CCCC]'
              }`}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#00CCCC] text-white' : 'text-gray-600 hover:text-[#00CCCC]'
              }`}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex-1 max-w-md">
            <SearchInput onSearch={handleSearch} />
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-transparent text-gray-700 px-4 py-3 rounded-xl hover:text-[#00CCCC] hover:bg-[#00CCCC]/10 transition-colors disabled:opacity-50 whitespace-nowrap"
            title="Refresh products"
          >
            <RotateCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        {searchQuery && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <p className="text-gray-600">
              Showing results for:{' '}
              <span className="font-semibold text-[#00CCCC]">&quot;{searchQuery}&quot;</span>
            </p>
          </div>
        )}
        {loading ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
              <ProductSkeleton key={index} viewMode={viewMode} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchQuery ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try adjusting your search terms or browse our categories.'
                : 'Check back later for new arrivals.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
                className="bg-[#00CCCC] text-white px-6 py-2 rounded-xl hover:bg-[#00AAAA] transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="justify-center"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
