from fastapi.responses import JSONResponse

def success_response(data=None):
    return {
        "success": True,
        "error_code": 0,
        "message": "",
        "data": data
    }

def error_response(message="Error"):
    return {
        "success": False,
        "error_code": 1,
        "message": message,
        "data": None
    }
    
    
class AppException(Exception):
    def __init__(self, message: str, error_code: str = "0", status_code: int = 200):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code