# 🚀 ReTrack
<img width="1254" height="1254" alt="retracklogo" src="https://github.com/user-attachments/assets/c51a8309-46bd-487f-ade6-b09e453f0148" />


## 📱 Overview

ReTrack is a smart mobile assistant that centralizes important daily information such as parcel tracking, reminders, billing, and alerts into a single unified dashboard.

Instead of switching between multiple apps (email, tracking apps, reminders), ReTrack provides a seamless and intelligent user experience that improves productivity and reduces missed updates.

---

## 🎯 Key Features

### 📦 Parcel Tracking
- View and manage all parcels in one place  
- Add parcels manually with tracking number and item name  
- Real-time status display (e.g., In Transit, Delivered)  

---

### ⏰ Reminders Management
- Add reminders with date & time  
- Smart labeling:
  - Displays **“Today”** for current-day reminders  
  - Highlights important reminders  
- Simple and intuitive UI  

---

### 💳 Billing Detection
- Displays important billing-related information  
- Consolidates payment reminders in one section  

---

### 💼 Work & 🔔 Alerts
- Organizes work-related tasks  
- Displays alerts such as login notifications  
- Keeps users updated in one place  

---

### 🔍 Smart Detection (Email Integration Concept)
- Designed to integrate with **Google Authentication (OAuth 2.0)**  
- Uses **Gmail API** to retrieve user emails  
- Extracts key data such as:
  - Parcel tracking numbers  
  - Billing information  
  - Alerts  
- Uses **pattern matching and classification** to categorize information  

---

## 🛠️ Tech Stack

### 📱 Frontend
- **React Native (Expo)**  
  - Cross-platform (iOS & Android)  
  - Fast development and prototyping  

- **TypeScript**  
  - Type safety  
  - Better maintainability  

- **Expo Router**  
  - File-based navigation  
  - Simplified routing structure  

---

### 🔐 Backend
- **Java + Spring Boot**  
  - Handles backend logic and API endpoints  
  - Designed for email parsing and data processing  

---

### ☁️ Backend Services
- **Firebase Authentication**  
  - User login & registration  
  - Secure authentication system  

- **Firebase Firestore**  
  - Stores:
    - User data  
    - Parcels  
    - Reminders  
  - Supports real-time updates  

---

## 🧠 Technical Decisions & Reasoning

### 1. Component-Based Architecture
Reusable components such as:
- `ActionCard`  
- `MiniCard`  

**Why:**
- Improves reusability  
- Keeps UI consistent  
- Easier to scale and maintain  

---

### 2. Centralized Dashboard Design
All features are displayed on a single screen.

**Why:**
- Reduces app switching  
- Improves user efficiency  
- Provides better user experience  

---

### 3. Smart Categorization
Data is grouped into:
- Parcels  
- Billing  
- Work  
- Alerts  

**Why:**
- Keeps UI organized  
- Enhances readability  
- Mimics intelligent assistant behavior  

---

### 4. Email Extraction Approach
- Uses **Gmail API** (planned integration)  
- Applies pattern matching for:
  - Tracking numbers  
  - Payment keywords  
- Classifies emails into categories  

**Why:**
- Automates data entry  
- Reduces manual effort  
- Adds “smart assistant” capability  

---

## 🔄 Feature Flow

### 📦 Parcel Flow
User adds parcel → Stored in system → Displayed in Parcel Card → Status updated  

---

### ⏰ Reminder Flow
User adds reminder → Select date & time → Stored → Displayed with smart label (**Today**)  

---

### 📧 Email Processing Flow (Concept)
User logs in → Google Auth → Gmail API fetch → Data extraction → Categorization → Display on dashboard  

---

## 🏗️ Architecture Overview
[ Mobile App (React Native) ]
↓
[ Firebase Authentication ]
↓
[ Spring Boot Backend ]
↓
[ Gmail API + Data Processing ]
↓
[ Firestore Database ]

---

## 📌 Highlights

- Clean and modern UI design  
- Smart data grouping and display  
- Scalable architecture (frontend + backend separation)  
- Designed for real-world integration (Gmail API + Firebase)  

---

## 📂 Repository Structure
#### ReTrack/
#### ├── mobile/ # React Native app
#### ├── backend/ # Spring Boot backend
#### └── README.md

---

## 🚀 Future Improvements

- Full Gmail API integration  
- Push notifications for reminders & alerts  
- AI-based email classification  
- Real-time parcel tracking updates  
- Cloud deployment  

---

## 👨‍💻 Author
Chin Yiu Ern
