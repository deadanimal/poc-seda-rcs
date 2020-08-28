# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class Ecashflowam(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    am_id = models.CharField(max_length=100, default='NA', blank=True)
    re_type = models.CharField(max_length=100, default='NA', blank=True)
    re_type_text = models.CharField(max_length=100, default='NA', blank=True)
    am_ref_number = models.CharField(max_length=100, default='NA', blank=True)
    am_tariff = models.CharField(max_length=100, default='NA', blank=True)
    am_date_fitcd = models.CharField(max_length=100, default='NA', blank=True)
    am_application_status = models.CharField(max_length=100, default='NA', blank=True)
    es_description = models.CharField(max_length=100, default='NA', blank=True)
    district = models.CharField(max_length=100, default='NA', blank=True)
    state = models.CharField(
        max_length=100, default='NA', blank=True)
    am_state = models.CharField(
        max_length=100, default='NA', blank=True)
    am_district = models.CharField(max_length=100, default='NA', blank=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']

    def __str__(self):
        return self.name
