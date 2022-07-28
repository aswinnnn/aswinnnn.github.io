st = "my 620 days"

def url(url: str) -> str:
    url = url.split(" ")
    url = "%20".join(url)
    return url

print(url(st))



