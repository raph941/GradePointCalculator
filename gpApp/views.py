from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json

from .utils import getPoints

def home(request):
    return render(request, 'home.html')

def DataProcessView(request):
    
    if request.POST:
        data_buff = request.POST.get('data')
        data = eval(data_buff)
        data_arr = []
        total_units = 0
        total_points = 0
        
        for course in data:
            courseUnits = float(course.get('courseUnits'))

            calc = getPoints(float(course.get('courseScore')))
            course_points = calc.get('points') * courseUnits
            total_units += courseUnits
            total_points += course_points

            data_arr.append({
                'name': course.get('courseName'),
                'grade': calc.get('grade'),
                'course_points': course_points
            })

        gp = total_points/total_units

        return JsonResponse({
            "courses": data_arr,
            'total_units': total_units,
            'total_points': total_points,
            'gp': gp
        })

    return HttpResponse(json.dumps({"message": "Only POST request allowed", "status":404}), content_type="application/json")