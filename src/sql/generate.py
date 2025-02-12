import json
import random
from faker import Faker
from datetime import datetime

fake = Faker()


def generate_sql(
    filename="./src/sql/generated_data.sql",
    num_banners=20,
    num_categories=30,
    num_products=60,
):
    sql_statements = []

    # Generate Banner Data
    for _ in range(num_banners):
        banner_id = fake.uuid4()
        title = fake.sentence(nb_words=3).replace("'", "''")
        image = fake.image_url()
        description = fake.sentence(nb_words=10).replace("'", "''")
        badge = fake.word().capitalize()
        created_at = datetime.utcnow().isoformat()
        updated_at = datetime.utcnow().isoformat()

        sql_statements.append(
            f"""
        INSERT INTO banners (id, title, image, description, badge, created_at, updated_at)
        VALUES ('{banner_id}', '{title}', '{image}', '{description}', '{badge}', '{created_at}', '{updated_at}');
        """.strip()
        )

    # Generate Category Data
    categories = []
    for _ in range(num_categories):
        category_id = fake.uuid4()
        name = fake.unique.word().capitalize()
        slug = name.lower().replace(" ", "-")
        description = fake.sentence(nb_words=10).replace("'", "''")
        created_at = datetime.utcnow().isoformat()
        updated_at = datetime.utcnow().isoformat()

        categories.append(category_id)
        sql_statements.append(
            f"""
        INSERT INTO categories (id, name, slug, description, created_at, updated_at)
        VALUES ('{category_id}', '{name}', '{slug}', '{description}', '{created_at}', '{updated_at}');
        """.strip()
        )

    # Generate Product Data
    for _ in range(num_products):
        product_id = fake.uuid4()
        name = fake.sentence(nb_words=2).replace("'", "''")
        slug = name.lower().replace(" ", "-")
        price = str(random.randint(10000, 10000000))
        image = fake.image_url()
        discount = random.randint(0, 50)
        description = fake.sentence(nb_words=20).replace("'", "''")
        tokopedia_link = fake.url()
        shopee_link = fake.url()
        tiktok_link = fake.url()
        category_id = random.choice(categories) if categories else "NULL"
        created_at = datetime.utcnow().isoformat()
        updated_at = datetime.utcnow().isoformat()

        sql_statements.append(
            f"""
        INSERT INTO products (id, name, slug, price, image, discount, description, tokopedia_link, shopee_link, tiktok_link, category_id, created_at, updated_at)
        VALUES ('{product_id}', '{name}', '{slug}', '{price}', '{image}', {discount}, '{description}', '{tokopedia_link}', '{shopee_link}', '{tiktok_link}', '{category_id}', '{created_at}', '{updated_at}');
        """.strip()
        )

    # Write to file
    with open(filename, "w", encoding="utf-8") as file:
        file.write("\n".join(sql_statements))

    print(f"File '{filename}' has been created successfully.")


# Run the generator
generate_sql()
