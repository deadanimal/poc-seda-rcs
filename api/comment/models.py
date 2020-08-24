# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class Comment(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    comment = models.CharField(max_length=100, default='NA', blank=True)
    user_id = models.CharField(max_length=100, default='NA', blank=True)
    phase = models.CharField(max_length=100, default='NA', blank=True)
    project_id = models.CharField(max_length=100, default='NA', blank=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']

    def __str__(self):
        return self.name
