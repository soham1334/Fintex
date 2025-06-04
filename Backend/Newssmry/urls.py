from django.urls import path,include



from Newssmry.views import summary
urlpatterns = [
    path("summary/",summary,name = "summary"),
]