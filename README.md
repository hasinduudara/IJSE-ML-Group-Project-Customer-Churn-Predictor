# Customer Churn Predictor 🚀

An enterprise-grade Customer Churn Prediction system featuring a machine learning backend and an interactive frontend. The system not only predicts whether a customer will churn or stay but also provides detailed explainability using SHAP (SHapley Additive exPlanations) in a bilingual interface (English and Sinhala).

## 🏗️ Project Structure (Monorepo)

This repository is structured as a monorepo containing three main components:

*   **/frontend**: React application built with Vite and Tailwind CSS. Provides a no-scroll, responsive, and bilingual user interface.
*   **/backend**: REST API built with FastAPI to serve ML predictions and SHAP explanations.
*   **/ml**: Machine learning pipelines, Jupyter notebooks, data preprocessing steps, and trained models (Random Forest).

## 🚀 Tech Stack

*   **Frontend**: React (Function Declarations), Vite, Tailwind CSS
*   **Backend**: FastAPI, Uvicorn, Python
*   **Machine Learning**: Scikit-Learn (Random Forest), Pandas, SHAP, Joblib
*   **Deployment**: Docker, Google Cloud Platform (GCP) Cloud Run

## 👥 Team Members

This project was built by a dedicated team of software engineering students:

*   **Hasindu Udara** - [https://github.com/hasinduudara](https://github.com/hasinduudara)
*   **Kavindu Avishka** - [https://github.com/Avishka30](https://github.com/Avishka30)
*   **Dilmi Kaushalya** - [https://github.com/dil2003-av](https://github.com/dil2003-av)
*   **Dulanji Amanda** - [https://github.com/Dulanji-Amanda](https://github.com/Dulanji-Amanda)
*   **Nethmi Diwyanga** - [https://github.com/NethmiDN](https://github.com/NethmiDN)

## ⚙️ How to Run Locally

Please refer to the specific README files inside each folder for detailed setup instructions:

*   [Frontend Setup Guide](./frontend/README.md)
*   [Backend Setup Guide](./backend/README.md)
*   [Machine Learning Guide](./ml/README.md)

## 🐳 Deployment

This project includes `Dockerfile.frontend` and `Dockerfile.backend` in the root directory, making it fully ready to be deployed as containerized services on Google Cloud Platform (GCP) Cloud Run.