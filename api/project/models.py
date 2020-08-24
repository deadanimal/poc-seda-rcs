# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class Project(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA', blank=True)
    start_date = models.DateTimeField(blank=True)
    expected_completion_date = models.DateTimeField(blank=True)
    project_timeframe = models.CharField(
        max_length=100, default='NA', blank=True)
    department = models.CharField(max_length=100, default='NA', blank=True)
    owner_project = models.CharField(max_length=100, default='NA', blank=True)
    source_of_fund = models.CharField(max_length=100, default='NA', blank=True)
    project_cost = models.CharField(max_length=100, default='NA', blank=True)
    pic = models.CharField(max_length=100, default='NA', blank=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']

    def __str__(self):
        return self.name
