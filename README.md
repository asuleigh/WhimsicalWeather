# [Whimsical Weather](https://asuleigh.github.io/WhimsicalWeather/)
The team created a deployable calendar application called Whimsical Weather for Project 1 at the UNCC Coding Bootcamp.

## Description
The Whimsical Weather app is a calendar application that takes an input of a zip code within the United States and displays the weather for the next two weeks in that area. The data shown on the calendar is an icon and forecast of the weather, which is also defined by the temperature or precipitation in GIF form. The app also deploys a Fun-Fact section that displays a modal with a fun fact when clicked!

## Functionality
The APIs used for the calendar are Toast UI, GIPHY, OpenWeatherMap, and Useless Facts. The CSS framework used is Bulma. The zip code is taken in with an on-click button that ties in the GIPHY, OWM, and UF APIs. The weather icon and forecast are rendered using the OWM API, then the GIF is rendered using a word related to the different temperatures given by OWM. The temperatures provided by OWM are matched to arrays of related words in the js file which are then matched to the correct type of GIF to be rendered. A user can click the Fact of the Day button to cause a modal to appear that displays a fun fact (utilizing UF). Each time a new zip code is entered, the previous information is cleared and the new information for that zip code is displayed.

## Preview
![Gif](WWGIF.gif)

## Links
[Whimsical Weather](https://asuleigh.github.io/WhimsicalWeather/)
<br>
[GitHub Repo](https://github.com/asuleigh/WhimsicalWeather)
