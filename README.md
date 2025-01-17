# 🚗 BMW Banner Editor

A React TypeScript application that allows users to create and customize interactive banners for BMW promotional content. This project demonstrates the implementation of drag-and-drop functionality, dynamic text editing, and color customization in a modern web application.

## LIVE DEMO
https://hkst21.github.io/bmwbannereditor

## ✨ Features

### 📝 Dynamic Text Editing
- Click on the banner heading to enter edit mode
- Customize text content, size, and color using an intuitive interface
- Real-time preview of changes
- Four predefined BMW brand colors available:
  - BMW Blue (#0166B1)
  - BMW White (#FFFFFF)
  - BMW Grey (#6F6F6F)
  - Black (#000000)

### 🖱️ Interactive Image Positioning
The application features a dedicated drag area where users can:
- Freely position the BMW vehicle image using drag-and-drop
- Fine-tune the image position within the designated boundary
- Visual feedback with a dashed border indicating the draggable area
- Smooth drag operations with precise position calculations

### 📱 Responsive Layout
- Grid-based layout system ensuring consistent spacing
- Responsive design adapting to different screen sizes
- Maintains visual hierarchy across devices
- Optimized component spacing and alignment

### 🔘 Call-to-Action Buttons
- Two interactive buttons linking to external BMW services:
  - "Discover BMW" - redirects to BMW's main website
  - "Test Drive" - connects to BMW's test drive scheduling service
- Secure external link handling with proper window opening protocols

## 🛠️ Technical Implementation

### 💻 Key Technologies
- React 18
- TypeScript
- CSS Grid & Flexbox
- HTML5 Drag and Drop API

### 🔄 State Management
- React useState hooks for component state management
- TypeScript interfaces ensuring type safety
- Controlled components for form inputs

### 🏗️ Component Structure
- Main container using CSS Grid for layout management
- Modular components for different banner sections
- Drag area with absolute positioning for precise image placement
- Flexible content areas with proper spacing and alignment

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install