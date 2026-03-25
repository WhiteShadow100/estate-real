from pydantic import BaseModel
from typing import Any


class Response(BaseModel):
    error_code: int
    data: dict[str, Any]