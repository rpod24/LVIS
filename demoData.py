import json
import random

# Function to generate a single product document
def generate_product_document(index):
    return {
        "productImage": f"https://example.com/images/product{index}.jpg",
        "description": f"High-quality product {index} with ergonomic design and long battery life.",
        "category": random.choice(["Electronics", "Home Appliances", "Furniture", "Toys"]),
        "manufacturer": random.choice(["TechBrand", "HomeGoods", "FurniCo", "ToyMakers"]),
        "itemName": f"Product {index} Name",
        "model": f"Model{index}",
        "sku": f"SKU{index}",
        "dimensions": {
            "length": round(random.uniform(10, 20), 2),
            "width": round(random.uniform(5, 15), 2),
            "height": round(random.uniform(3, 10), 2)
        },
        "weight": round(random.uniform(100, 500), 2),
        "barCode": f"{random.randint(100000000000, 999999999999)}", 
        "unitCost": round(random.uniform(10, 50), 2),
        "unitPrice": round(random.uniform(20, 100), 2),
        "minimumItemThreshold": random.randint(5, 15),
        "tags": ["wireless", "ergonomic", "product", random.choice(["Electronics", "Home", "Office"])],
        "specSheet": f"https://example.com/specs/model{index}.pdf",
        "partNumber": f"PN{index}",
        "notes": f"Notes for product {index}",
        "unitsOnHand": random.randint(10, 100)
    }

# Generate 100 product documents
products = [generate_product_document(i) for i in range(35, 70)]

# Output the products in JSON format
output = json.dumps(products, indent=2)
print(output)
