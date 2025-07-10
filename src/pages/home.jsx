import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import 'antd/dist/reset.css';
import { LoadingOutlined } from '@ant-design/icons';
import { AiOutlineDownload } from "react-icons/ai";
import { Upload, Github, Linkedin, Mail, Globe } from 'lucide-react';

function Home() {
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (query) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      setImages([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, per_page: 20 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });

      setTimeout(() => {
        setImages(response.data.results);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.message);
      setImages([]);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(searchTerm);
  };

  const handleImageDownload = async (url, filename, format = 'jpg') => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: `image/${format}` });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${filename}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  useEffect(() => {
    fetchImages("nature");
  }, []);

  return (
    <>
      <div className="container-sm bg-white min-h-screen p-6 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">Random Quote Generator 🎭</h1>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col sm:flex-row justify-center items-center sm:relative mx-auto drop-shadow w-full sm:w-3/4 max-w-3xl px-4"
        >
          <div className="relative w-full sm:w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setImages([]);
                setError(null);
              }}
              placeholder="Search for images..."
              className="w-full py-2.5 pr-28 pl-4 rounded-full border border-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-0 h-full  right-0 bg-blue-600 text-white text-sm sm:text-md px-4 py-1.5 sm:px-5 sm:py-2 rounded-full"
            >
              Search
            </button>
          </div>
        </form>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <Spin
          spinning={loading}
          indicator={<LoadingOutlined spin />}
          tip="Loading..."
          size="large"
          className="flex justify-center items-center min-h-[200px]"
        >
          {!loading && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {images.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.urls.small}
                    alt={img.alt_description || 'Unsplash Image'}
                    className="w-full h-64 object-cover rounded-lg shadow"
                  />
                  <div className="flex justify-between py-2 items-center">
                    <p className="text-xs mt-2 text-gray-600 tracking-normal">
                      Photo by{' '}
                      <a
                        href={`https://unsplash.com/@${img.user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {img.user.name}
                      </a>{' '}
                      on{' '}
                      <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Unsplash
                      </a>
                    </p>
                    <button
                      onClick={() => handleImageDownload(img.urls.full, `photo-${img.id}`, 'jpg')}
                      className="w-auto px-3 py-1.5 ml-1 bg-black hover:bg-blue-700 text-white text-xs rounded shadow opacity-100 group-hover:opacity-100 transition flex flex-row items-center"
                    >
                      Download <span className="text-md pl-2"><AiOutlineDownload /></span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </Spin>
      </div>

      <footer className="mt-16 bg-gray-100 border-t border-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg font-light text-gray-600">Connect with me</p>
            <div className="flex space-x-8">
              <a href="https://github.com/akanaskhan" className="text-gray-400 hover:text-black transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/muhammad-anas-khan786" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:muhammadanaskhanak@gmail.com" className="text-gray-400 hover:text-black transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://akanaskhan.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors duration-300">
                <Globe className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-400 font-light">
              © {new Date().getFullYear()} Anas Khan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
