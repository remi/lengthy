require "bundler"
Bundler.require

task :version do
  $version = JSON.parse(File.read("./src/manifest.json"), :symbolize_names => true)[:version]
end

desc "Generate the CRX file for single install"
task :crx => :version do
  CrxMake.make(
    :ex_dir => "./src",
    :pkey   => "./keys/lengthy.pem",
    :crx_output => "./dist/crx/lengthy-#{$version}.crx",
    :verbose => true,
    :ignoredir => /\.git/
  )
end

desc "Generate the ZIP file for the Chrome Web Store"
task :zip => :version do
  CrxMake.zip(
    :ex_dir => "./src",
    :pkey   => "./keys/lengthy.pem",
    :zip_output => "./dist/zip/lengthy-#{$version}.zip",
    :verbose => true,
    :ignoredir => /\.git/
  )
end
