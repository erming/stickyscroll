module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			js: {
				files: {
					"src/stickyscroll.min.js": ["src/stickyscroll.js"]
				},
				options: {
					banner: "/*!\n"
						+ " * inputhistory\n"
						+ " * http://github.com/erming/inputhistory\n"
						+ " * v<%= pkg.version %>\n"
						+ " */\n",
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.registerTask(
		"default",
		["uglify"]
	);
};
