# Backend

## Install

### Create Virtual Environment

```
python -m venv .venv
```

### Active Virtual Environment

- Windows

```
call .venv/Scripts/activate.bat
```

- Linux

```
. .venv/Scripts/activate
```

### Install Packages

```
pip install -r requirements.txt
```


### Running

```
cd backend/api
chalice local --autoreload
```