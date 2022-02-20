
  

# Genesis

## EG Klank Archive Project
## Live at https://www.egklank.co.za/ 

## Requirements

- Python 3.8.9

- PIP 20.2.3

## Setup

#### Clone the repo

```bash

git clone https://github.com/MrTwister96/special-broccoli egklank

```

#### Change to the directory

```bash

cd egklank

```

#### Create virtual environment

```bash

python3 -m venv env

```

#### Activate virtual environment

##### Windows

```bash

.\env\Scripts\activate

```

##### Linux

```bash

source env/bin/Activate

```

#### Install Requirements

```bash

pip install -r requirements.txt

```

#### Run Migrations

```bash

python3 manage.py makemigrations

python3 manage.py migrate

```

#### Create a super user

```bash

python3 manage.py createsuperuser

```

#### Start development server

```bash

python3 manage.py runserver 0.0.0.0:8000

  

Watching for file changes with StatReloader

Performing system checks...

  

System check identified no issues (0 silenced).

February 06, 2022 - 12:42:01

Django version 3.1.7, using settings 'genesis.settings'

Starting development server at http://0.0.0.0:8000/

Quit the server with CONTROL-C.

```