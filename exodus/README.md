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
### Environment Variables 
```bash
export REACT_APP_API_BASE_URL="URL OF THE API SERVER"
export REACT_APP_FRONTEND_BASE_URL="URL OF THE REACT APP"
```

### Running frontend dev server
```bash
cd frontend
npm install
npm start
```