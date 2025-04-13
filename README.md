

# 🌟 Prismweaver 🌟

FRONT END

Welcome to **Prismweaver**, an innovative web-based data cleaning and transformation tool that empowers you to work with your datasets effortlessly! This project is my **first-ever full-stack application**, and I am thrilled to share it with the world. 🎉

Prismweaver is designed to simplify the process of **data preprocessing** and **cleaning**, making it accessible for both beginners and professionals. Whether you’re preparing data for machine learning or cleaning up messy datasets, Prismweaver has got you covered!

---

## 🚀 Features
Prismweaver comes packed with a variety of features to make your data cleaning experience seamless and enjoyable:
- **Upload and Analyze Datasets**:
  - Upload CSV files with ease.
  - Automatically group columns into **categorical**, **numerical**, and **float** types.
  - Identify columns with missing values.

- **Handle Missing Data**:
  - Fill missing values using strategies like **mean**, **median**, **mode**, or a **custom value**.

- **Remove Duplicate Data**:
  - Effortlessly detect and remove duplicate rows in your dataset.

- **Fix Structural Errors**:
  - Rename columns and correct inconsistencies in column names.
  - Convert columns to their appropriate types (e.g., numerical, categorical).

- **Interactive Drag-and-Drop Transformations**:
  - Apply transformations such as:
    - `Fillna` (fill missing values).
    - `Convert to Numerical`.
    - `Convert to Categorical`.

- **Preview Your Data**:
  - Instantly view a preview of your cleaned and transformed dataset.

---

## 🛠️ Technologies Used
Prismweaver is built using modern web technologies and tools:

### **Backend**:
- **FastAPI**: A blazing-fast Python framework for building APIs.
- **Pandas**: For powerful data manipulation and analysis.
- **Uvicorn**: ASGI server to run the FastAPI app.

### **Frontend**:
- **React**: A modern JavaScript library for building interactive UIs.
- **CSS**: For styling and making the app visually appealing.

### **Hosting**:
- **Render**: Deployed on Render for seamless and reliable hosting.

---

## 🌈 Why Prismweaver?
As my **first full-stack project**, Prismweaver represents my journey into the exciting world of software development. I’ve poured my creativity, passion, and effort into making this tool intuitive, user-friendly, and powerful.

I believe in the power of accessible tools, and Prismweaver is my way of contributing to the community. It’s not just a project; it’s the beginning of my adventure in tech. 🚀

---

## 📸 Screenshots
![Upload Dataset](https://via.placeholder.com/800x400.png?text=Upload+Dataset)
*Upload and preview your dataset easily!*

![Transform Zones](https://via.placeholder.com/800x400.png?text=Drag+and+Drop+Transformations)
*Drag and drop columns to apply transformations.*

![Data Preview](https://via.placeholder.com/800x400.png?text=Data+Preview)
*View the results of your transformations instantly.*

---

## 📝 How to Use
### **1. Clone the Repository**
Clone the frontend and backend repositories from GitHub:
```bash
git clone https://github.com/<your-username>/prismweaver-backend.git
git clone https://github.com/<your-username>/prismweaver-frontend.git
```

### **2. Set Up Backend**
1. Navigate to the backend directory:
   ```bash
   cd prismweaver-backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### **3. Set Up Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd prismweaver-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### **4. Open the App**
- Open your browser and go to:
  - Frontend: `http://localhost:3000/`
  - Backend API documentation: `http://localhost:8000/docs`

---

## 🎉 Live Demo
The full app is deployed and live! Check it out here:
- **Frontend**: [https://prismweaver-frontend.onrender.com](https://prismweaver-frontend.onrender.com)
- **Backend API**: [https://prismweaver-backend.onrender.com/docs](https://prismweaver-backend.onrender.com/docs)

---

## 🤝 Contributing
I welcome contributions to make Prismweaver even better! 🚀

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to GitHub.
4. Submit a Pull Request, and I’ll review it as soon as possible.

---

## 🛡️ License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you like. 🌟

---

## ❤️ Acknowledgments
- **FastAPI** for making backend development so enjoyable.
- **React** for enabling the creation of dynamic and interactive UIs.
- **Render** for providing an amazing platform to host this project.

---

## 📢 Let’s Connect!
I’m always looking to connect with like-minded individuals and learn from the community. Feel free to reach out or follow me:
- **GitHub**: [https://github.com/muma005](https://github.com/muma005)
- **Twitter**: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)

---

Thank you for visiting my project! I hope Prismweaver makes your data cleaning experience smooth and enjoyable. 🎉 Let’s weave some data magic together! ✨
