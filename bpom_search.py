#!/usr/bin/env python3
"""
Medik Project - BPOM Drug Search Prototype
Search Indonesian drug database (BPOM) by product name.
"""

import urllib.request
import urllib.parse
import json
import http.cookiejar
import re
import sys

BASE_URL = "https://cekbpom.pom.go.id"
API_ENDPOINT = "/produk-dt/all"
SEARCH_PAGE = "/all-produk"

def get_csrf_token():
    """Fetch CSRF token from the search page."""
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    req = urllib.request.Request(
        BASE_URL + SEARCH_PAGE,
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    resp = opener.open(req, timeout=15)
    html = resp.read().decode('utf-8', errors='ignore')
    match = re.search(r'name="csrf-token"\s+content="([^"]+)"', html)
    if not match:
        raise Exception("Could not extract CSRF token")
    return match.group(1), opener

def search_drugs(query, limit=10):
    """Search BPOM database for drugs."""
    csrf_token, opener = get_csrf_token()
    
    url = BASE_URL + API_ENDPOINT
    data = {
        "draw": 1,
        "start": 0,
        "length": limit,
        "search": {"value": query, "regex": False},
        "nama_produk": query,
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode(),
        headers={
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json; charset=utf-8',
            'X-CSRF-TOKEN': csrf_token,
            'Accept': 'application/json'
        }
    )
    
    try:
        resp = opener.open(req, timeout=15)
        result = json.loads(resp.read().decode('utf-8'))
        return result
    except Exception as e:
        return {"error": str(e)}

def display_results(result):
    """Display search results in a readable format."""
    if "error" in result:
        print(f"Error: {result['error']}")
        return
    
    total = result.get('recordsTotal', 0)
    filtered = result.get('recordsFiltered', 0)
    data = result.get('data', [])
    
    print(f"\n{'='*60}")
    print(f"BPOM Drug Search Results")
    print(f"{'='*60}")
    print(f"Total products in BPOM: {total:,}")
    print(f"Results found: {filtered:,}")
    print(f"{'='*60}\n")
    
    if not data:
        print("No results found.")
        return
    
    for i, item in enumerate(data, 1):
        print(f"{i}. {item.get('PRODUCT_NAME', 'N/A')}")
        brand = item.get('PRODUCT_BRANDS', '-')
        if brand != '-':
            print(f"   Brand: {brand}")
        print(f"   Registration No: {item.get('PRODUCT_REGISTER', 'N/A')}")
        print(f"   Form: {item.get('PRODUCT_FORM', 'N/A')}")
        print(f"   Package: {item.get('PRODUCT_PACKAGE', 'N/A')}")
        print(f"   Applicant: {item.get('REGISTRAR', 'N/A')}")
        print(f"   Status: {item.get('STATUS', 'N/A')}")
        print()

def print_disclaimer():
    """Print the mandatory medical disclaimer."""
    print("\n" + "="*60)
    print("DISCLAIMER: This information is for educational purposes only.")
    print("It is NOT medical advice. Always consult a doctor or pharmacist")
    print("before taking any medication. In emergency, contact your local")
    print("emergency services.")
    print("="*60)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 bpom_search.py <search_query> [limit]")
        print("Example: python3 bpom_search.py paracetamol 5")
        sys.exit(1)
    
    query = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    
    print(f"Searching BPOM for '{query}'...")
    result = search_drugs(query, limit)
    display_results(result)
    print_disclaimer()

if __name__ == "__main__":
    main()
