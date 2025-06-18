import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto border-t bg-[#8B975E] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            {/* nav logo */}
            <div>
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-6" />
                <h2 className="text-xl font-bold">
                  <span className="text-blue-700">Athletic</span>Hub
                </h2>
              </Link>
            </div>
            <p className="text-sm opacity-80">
              Your premier destination for sports training, equipment, and
              community.
            </p>
            <div className="flex space-x-4">
              <a href="/" className="btn btn-circle btn-sm btn-ghost">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="link link-hover opacity-80 hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="link link-hover opacity-80 hover:text-primary"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">
                  123 Sports Ave, Athletic City, AC 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="opacity-80">(+880) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span className="opacity-80">info@athletichub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="opacity-80">
                  Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8 opacity-20"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} AthleticHub. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href=""
              className="link link-hover text-sm opacity-80 hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href=""
              className="link link-hover text-sm opacity-80 hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href=""
              className="link link-hover text-sm opacity-80 hover:text-primary"
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8 text-sm opacity-60 flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
          AthleticHub Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
