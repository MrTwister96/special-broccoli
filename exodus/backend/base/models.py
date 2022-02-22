from django.db import models
from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Congregation(models.Model):
    name = models.CharField(verbose_name='Congregation Name', max_length=50)
    slug = models.SlugField(verbose_name='Congregation Slug', unique=True, max_length=50)
    address = models.CharField(verbose_name='Address', max_length=100, blank=True, null=True)
    website = models.URLField(verbose_name='Website', max_length=100, blank=True, null=True)
    facebook_page = models.URLField(verbose_name='Facebook Page', max_length=100, blank=True, null=True)
    email = models.EmailField(verbose_name='Email', max_length=50, blank=True, null=True)
    contact_number = PhoneNumberField(verbose_name='Contact Number', blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Congregation'
        verbose_name_plural = 'Congregations'
    
    def __str__(self):
        return f"{self.name}"

def audio_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/sermons/<uuid>.mp3
    return f'sermons/{str(uuid4())}.mp3'

class Sermon(models.Model):
    date = models.DateTimeField(verbose_name="Date", auto_now=False, auto_now_add=False)
    theme = models.CharField(verbose_name="Theme", max_length=200)
    scripture = models.CharField(verbose_name="Scripture", max_length=200)
    download_count = models.IntegerField(verbose_name="Download Count", default=0)
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True)
    preacher = models.ForeignKey("Preacher", on_delete=models.DO_NOTHING)
    series = models.ForeignKey("Series", on_delete=models.DO_NOTHING, blank=True, null=True)
    series_index = models.IntegerField(verbose_name="Series Index", blank=True, null=True)
    audio_file = models.FileField(verbose_name="Audio File" ,upload_to=audio_path)
    

    class Meta:
        ordering = ["-date"]
        verbose_name = "Sermon"
        verbose_name_plural = "Sermons"
    
    def __str__(self):
        return f"{self.theme}"

class Preacher(models.Model):
    TITLE_CHOICES = [
        ("Mr", "Mr"),
        ("Student", "Student"),
        ("Prop", "Prop"),
        ("Ds", "Ds"),
        ("Dr", "Dr"),
    ]
    
    title = models.CharField(verbose_name="Title", max_length=10, choices=TITLE_CHOICES)
    name = models.CharField(verbose_name="Name", max_length=50)
    surname = models.CharField(verbose_name="Surname", max_length=50)
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True)
    email = models.EmailField(verbose_name='Email', max_length=50, blank=True, null=True)
    contact_number = PhoneNumberField(verbose_name='Contact Number', blank=True)

    class Meta:
        ordering = ["surname"]
        verbose_name = "Preacher"
        verbose_name_plural = "Preachers"
    
    def __str__(self):
        return f"{self.surname}, {self.name} ({self.title})"

class Series(models.Model):
    name = models.CharField(verbose_name="Series Name", max_length=50)
    description = models.TextField(verbose_name="Series Description", max_length=1000)
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Series"
        verbose_name_plural = "Series"
    
    def __str__(self):
        return f"{self.name}"