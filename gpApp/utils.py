def getPoints(score):
    '''returns the point of a single course when provided with the score'''
    if score>=0 and score <= 39:
        return  {
            'points': 0.00,
            'grade': 'F'
        }
    elif score>=40 and score <= 44:
        return {
            'points': 2.00,
            'grade': 'E'
        }
    elif score>=45 and score <= 49:
        return {
            'points': 2.25,
            'grade': 'D'
        }
    elif score>=50 and score <= 54:
        return {
            'points': 2.5,
            'grade': 'CD'
        }
    elif score>=55 and score <= 59:
        return {
            'points': 2.75,
            'grade': 'C'
        }
    elif score>=60 and score <= 64:
        return {
            'points': 3.0,
            'grade': 'BC'
        }
    elif score>=65 and score <= 70:
        return {
            'points': 3.25,
            'grade': 'B'
        }
    elif score>=70 and score <= 74:
        return {
            'points': 3.5,
            'grade': 'AB'
        }
    elif score>=75 and score <= 100:
        return {
            'points': 4.0,
            'grade': 'A'
        }
    else:
        pass

