### The below setup is for windows (Enter into server folder)

1. Creating virtual environment using this command

```sh
py -m venv venv
```

2. Now enter into this venv using

```sh
venv\Scripts\activate
```

3. To install all the package in venv

```sh
pip install -r requirements.txt
```

4. For Migrate

```sh
py manage.py migrate
```

5. To run server

```sh
py manage.py runserver
```

6. Create superuser using this command

```sh
py manage.py createsuperuser
```
