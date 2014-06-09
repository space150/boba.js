#
# Jekyll Generator for SCSS
#
# (File paths in this description relative to jekyll project root directory)
# Place this file in ./_plugins
# Place .scss files in ./_scss
# Compiles .scss files in ./_scss to .css files in whatever directory you indicated in your config
# Config file placed in ./_sass/config.rb

require 'compass'
require 'compass/exec'

module Jekyll
  class CompassGenerator < Generator
    safe true

    def initialize(site_config)
      super
      @site_config = site_config
    end

    def generate(site)
      Dir.chdir sass_dir do
        Compass::Exec::SubCommandUI.new(%w(compile)).run!
      end

      site.read_directories(css_path(Compass.configuration))
    end

    private

    def sass_path
      '_sass'
    end

    def sass_dir
      File.expand_path(sass_path, base_dir)
    end

    def css_path(compass_config)
      normalize(File.join(sass_path, compass_config.css_dir))
    end

    def base_dir
      @site_config[:source]
    end

    def normalize(path)
      Pathname.new(path).cleanpath.to_s
    end
  end
end
