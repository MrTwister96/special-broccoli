from email.mime import image
from django.db import models
from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField
from django.dispatch import receiver
import os

def image_path(instance, filename):
    return f'images/{str(uuid4())}_{filename}'

class Congregation(models.Model):
    name = models.CharField(verbose_name='Congregation Name', max_length=50)
    slug = models.SlugField(verbose_name='Congregation Slug', unique=True, max_length=50)
    address = models.CharField(verbose_name='Address', max_length=100, blank=True, null=True)
    website = models.URLField(verbose_name='Website', max_length=100, blank=True, null=True)
    facebook_page = models.URLField(verbose_name='Facebook Page', max_length=100, blank=True, null=True)
    email = models.EmailField(verbose_name='Email', max_length=50, blank=True, null=True)
    contact_number = PhoneNumberField(verbose_name='Contact Number', blank=True)
    image_file = models.ImageField(verbose_name='Image File', upload_to=image_path)

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
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True, related_name="sermons")
    preacher = models.ForeignKey("Preacher", on_delete=models.DO_NOTHING, related_name="sermons")
    series = models.ForeignKey("Series", on_delete=models.DO_NOTHING, blank=True, null=True, related_name="sermons")
    series_index = models.IntegerField(verbose_name="Series Index", blank=True, null=True)
    audio_file = models.FileField(verbose_name="Audio File" ,upload_to=audio_path, max_length=500)
    

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
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True, related_name="preachers")
    email = models.EmailField(verbose_name='Email', max_length=50, blank=True, null=True)
    contact_number = PhoneNumberField(verbose_name='Contact Number', blank=True)

    class Meta:
        ordering = ["surname"]
        verbose_name = "Preacher"
        verbose_name_plural = "Preachers"
    
    def __str__(self):
        return f"{self.surname}, {self.name} ({self.title})"

    def label(self):
        return f"{self.title} {self.name} {self.surname}"

class Series(models.Model):
    name = models.CharField(verbose_name="Series Name", max_length=50)
    description = models.TextField(verbose_name="Series Description", max_length=1000)
    congregation = models.ForeignKey("Congregation", on_delete=models.SET_NULL, blank=True, null=True, related_name="series")

    class Meta:
        ordering = ['name']
        verbose_name = "Series"
        verbose_name_plural = "Series"
    
    def __str__(self):
        return f"{self.name}"
    
    def getLabel(self):
        label = f"{self.name}"
        if self.congregation:
            label = f"{self.name} ({self.congregation.name})"
        return label

@receiver(models.signals.post_delete, sender=Sermon)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.audio_file:
        if os.path.isfile(instance.audio_file.path):
            os.remove(instance.audio_file.path)

@receiver(models.signals.pre_save, sender=Sermon)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `MediaFile` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = Sermon.objects.get(pk=instance.pk).audio_file
    except Sermon.DoesNotExist:
        return False
    
    new_file = instance.audio_file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)

@receiver(models.signals.post_delete, sender=Congregation)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.image_file:
        if os.path.isfile(instance.image_file.path):
            os.remove(instance.image_file.path)

@receiver(models.signals.pre_save, sender=Congregation)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `MediaFile` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = Congregation.objects.get(pk=instance.pk).image_file
    except Congregation.DoesNotExist:
        return False
    
    new_file = instance.image_file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)