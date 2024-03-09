# Purpose
Setup automated test framework using CucumberJS library writing tests in Typescript.
The example feature uses selenium webdriver to launch tests for frontend.


# Get Started
1) Ensure you have node installed globally on your machine.
2) Ensure you have yarn installed globally on your machine.
3) Ensure you have chrome browser installed and its path defined (both windows and mac users)
4) Ensure you have geckodriver installed and its path defined (both windows and mac users)

# Running Project
1) `yarn install` -- this step will download the required packages defined in package.json
2) To run feature file
  `yarn cucumber --url=<URL>`
3) To run a scenario in parallel (that is more than 1 browsers)
  `yarn cucumber:parallel --url=<URL> --config=parallel`

# Writing scenarios and features
1) Create a new feature file under features folder e.g.`example.feature`
2) Add your scenario
3) Run the feature file, it will complain about missing/pending step def.
4) Simple copy those steps and create a new step file or add those steps to an existing file under `step_definitions`

# Reporting
For simple projects using single browsers, you can simply run the following command
in your process once test run is complete
`yarn generateTestReport`
