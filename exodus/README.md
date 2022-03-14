# Exodus

## Rebuild of the EG Klank Archive Using Reactjs as Frontend and Django REST as Backend

## Setting up Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
```

## Setting up the Frontend
```bash
cd frontend
npm install
npm start
```