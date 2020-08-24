# from api_basic.views import (
#     ApiBasicViewSet
# )
# from documents.views import (
#     DocumentsViewSet
# )
from comment.views import (
    CommentViewSet
)
from activity.views import (
    ActivityViewSet
)
from fail.views import (
    FailViewSet
)
from project.views import (
    ProjectViewSet
)
# Users app
from organisations.views import (
    OrganisationViewSet
)
from users.views import (
    CustomUserViewSet
)
from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)


class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass


router = NestedDefaultRouter()


comment_router = router.register(
    'comment', CommentViewSet
)

activity_router = router.register(
    'activity', ActivityViewSet
)

# # documents app


fail_router = router.register(
    'fail', FailViewSet
)

# # notifications app


project_router = router.register(
    'project', ProjectViewSet
)


# Organisations app


organisations_router = router.register(
    'organisations', OrganisationViewSet
)
# Users app


users_router = router.register(
    'users', CustomUserViewSet
)

urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]
