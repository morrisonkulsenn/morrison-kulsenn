module Jekyll
    class TagGenerator < Generator
      safe true
  
      def generate(site)
        tag_dir = File.join(site.source, "tags")
        Dir.mkdir(tag_dir) unless Dir.exist?(tag_dir)
  
        existing_tags = Dir.entries(tag_dir)
                           .select { |f| f.end_with?(".md") }
                           .map { |f| File.basename(f, ".md") }
  
        site.tags.each_key do |tag|
          tag_slug = tag.downcase.strip.gsub(" ", "-").gsub(/[^\w-]/, '')
          next if existing_tags.include?(tag_slug)
  
          File.open(File.join(tag_dir, "#{tag_slug}.md"), "w") do |file|
            file.puts "---"
            file.puts "layout: tag_page"
            file.puts "tag: #{tag}"
            file.puts "permalink: /tags/#{tag}/"
            file.puts "---"
          end
        end
      end
    end
  end
  