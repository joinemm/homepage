#!/usr/bin/env python

import json

with open("blog_post.json", "r") as f:
    data = json.load(f)

for post in data:
    with open(post["slug"] + ".md", "w") as md:
        frontmatter = "\n".join(
            [
                "---",
                f"title: {post['title']}",
                f"abstract: {post['excerpt']}",
                f"published: {'true' if post['status'] == 'published' else 'false'}",
                f"date: {post['date_created']}",
                f"image: {post['image']['filename_disk']}",
                f"tags: {' '.join(post['tags'])}",
                "---\n\n",
            ]
        )
        md.write(frontmatter)
        md.write(post["content"])

with open("art.json", "r") as f:
    data = json.load(f)

with open("artworks.json", "w") as new:
    data_new = [
        {
            "published": art["status"] == "published",
            "title": art["title"],
            "description": art["description"],
            "date": art["date_created"],
            "medium": art["medium"],
            "files": [
                art["file"]["filename_disk"],
            ]
            + [
                file["directus_files_id"]["filename_disk"]
                for file in art["extra_files"]
            ],
        }
        for art in data
    ]

    new.write(json.dumps(data_new, indent=2))

with open("page.json", "r") as f:
    data = json.load(f)

for post in data:
    with open(post["slug"] + ".md", "w") as md:
        frontmatter = "\n".join(
            [
                "---",
                f"title: {post['title']}",
                f"abstract: {post['excerpt']}",
                f"image: {post['embed_image']['filename_disk']}",
                "---\n\n",
            ]
        )
        md.write(frontmatter)
        md.write(post["content"])
