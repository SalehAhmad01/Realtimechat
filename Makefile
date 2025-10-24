# Makefile for Django project "api"

PYTHON=python
MANAGE=$(PYTHON) ./api/manage.py

# Start the development server
run:
	$(MANAGE) runserver

# Make migrations
migrations:
	$(MANAGE) makemigrations

# Apply migrations
migrate:
	$(MANAGE) migrate

# Create a superuser
superuser:
	$(MANAGE) createsuperuser

# Collect static files
collectstatic:
	$(MANAGE) collectstatic --noinput

# Run tests
test:
	$(MANAGE) test

# Clean cache/pyc files
clean:
	$(PYTHON) -c "import pathlib, shutil; \
	[shutil.rmtree(p) for p in pathlib.Path('.').rglob('__pycache__')]"
