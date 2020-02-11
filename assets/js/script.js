var OW_API_KEY = "166a433c57516f51dfab1f7edaed8413";
var CALENDAR_ID_WEATHER = 1;
var CALENDAR_ID_FACTS = 2;
var CALENDAR_ID_GIF = 3
var calendar;
var allFacts = []

function initCalendar() {
  calendar = new tui.Calendar(document.getElementById('calendar'), {
    isReadOnly: true,
    defaultView: 'month',
    month: {
      visibleWeeksCount: 2 // visible week count in monthly
    },
    calendars: [
      {
        id: CALENDAR_ID_WEATHER,
        name: 'Weather',
        color: '#ffffff',
        bgColor: '#49a57a',
        dragBgColor: '#49a57a',
        borderColor: '#49a57a'
      },
      {
        id: CALENDAR_ID_FACTS,
        name: 'Fun Facts',
        color: '#ffffff',
        bgColor: '#eeff00b9',
        dragBgColor: '#eeff00b9',
        borderColor: '#eeff00b9'
      },
      {
        id: CALENDAR_ID_GIF,
        style: 'height: "130px"',
        name: 'GIF',
        color: '#000000',
        class: 'test',
        bgColor: '#ffffff',
        dragBgColor: '#ffffff',
        borderColor: '#ffffff'
      }
    ],
    template: {
      allday: function (schedule) {
        var html = [];
        var imgClass = '';
        if (schedule.calendarId === '1') {
          var iconSrc = "https://openweathermap.org/img/wn/" + schedule.raw.icon + ".png";
          imgClass = 'weather-icon'
          $('span[data-calendar-id="3"]').css('height','130px!important')
          $('span[data-calendar-id="3"]').addClass('test')
          html.push(schedule.title);
        }
        else if (schedule.calendarId === '2') {
          var iconSrc = "https://img.icons8.com/wired/64/000000/question-mark.png";
          imgClass = 'imgFact'
          
          html.push(schedule.title);
        }
        else {
           var iconSrc = schedule.raw.icon
           imgClass = 'imgGif'
           
           $('span[title="gif"]').addClass('test')
           
        }
        html.push("<img src='" + iconSrc + "' alt='" + schedule.title + "' class="+imgClass+">");
       
        // console.log(html)
        $('div[data-calendar-id="3"]').css('height','auto')
        return html.join("");
      }
      
    }
    
  });
  calendar.on('clickSchedule', function (event) {
    var schedule = event.schedule;
    if (schedule.calendarId === '2') {
      console.log(schedule)
      randomz(schedule.id - 15)
      showModal()
    }
  });
}

function updateWeather(zip) {

  console.log(zip);
  var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + ',us&units=imperial&cnt=14&appid=' + OW_API_KEY;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var schedules = [];
    for (var i = 0; i < response.list.length; i++) {
      var currentDay = response.list[i];
      //console.log(Date.now())
      var startDate = moment.unix(currentDay.dt).toDate();
      // console.log(startDate)
      var endDate = moment(startDate).add(1, 'hour').toDate();

      schedules.push({
        id: i + 1,
        calendarId: '1',
        title: currentDay.weather[0].main,
        category: 'allday',
        isAllDay: true,
        dueDateClass: 'morning',
        start: startDate,
        end: endDate,
        raw: {
          icon: currentDay.weather[0].icon
        }
      });
    }
    console.log(schedules)
    calendar.createSchedules(schedules);
    randomFact(response)
  });
}
function gifIt(response) {
  var schedules = [];
  // var cDate = 
  console.log('running')
  //for (var i = 0; i < response.list.length; i++) {
    var counting = 0
    loop()
  function loop() {
    if  (counting< response.list.length){

    var currentDay = response.list[counting];
    var startDate = moment.unix(currentDay.dt).toDate();
    var endDate = moment(startDate).add(1, 'hour').toDate();
    console.log(currentDay.temp.day)
    console.log(queryURL);
    var phrase = gifTemp(currentDay.temp.day)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ujM6Ecn7mLRcfW3A40Ss8UtOlWKu7fQk&rating=g&q=" + phrase + "&limit=1";
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(function (response) {
        console.log(response.data[0].images.fixed_height_small.url)
        var url = response.data[0].images.fixed_height_small.url;

        console.log(phrase)
        schedules.push({
          id: counting + 30,
          calendarId: '3',
          title: 'gif',
          category: 'allday',
          isAllDay: true,
          dueDateClass: 'evening',
          start: startDate,
          end: endDate,
          raw: {
            icon: url
          }
        });
        counting++
        loop()
      })
    console.log('here')
  }
      else {
      console.log(schedules)
      calendar.createSchedules(schedules);

    }
  }

}
function randomFact(response) {
  var schedules = [];
  // var cDate = 
  console.log('running')
  for (var i = 0; i < response.list.length; i++) {
    var currentDay = response.list[i];
    var startDate = moment.unix(currentDay.dt).toDate();
    var endDate = moment(startDate).add(1, 'hour').toDate();
    schedules.push({
      id: i + 15,
      calendarId: '2',
      title: 'Fact of the Day',
      category: 'allday',
      isAllDay: true,
      dueDateClass: 'evening',
      start: startDate,
      end: endDate,
      raw: {
        icon: 'test'
      }
    });
  }
  console.log(schedules)
  calendar.createSchedules(schedules);
  gifIt(response)
}
const showModal = () => {
  $('.modal').addClass('is-active')
}
$('.delete').click(() => {
  $('.modal').removeClass('is-active')
})
const randomz = which => {
  console.log(which)
  $('.modal-card-title').html('<h1>Random Fact</h1>')
  $('.modal-card-body').text(allFacts[which])

}
function fact() {
  var factURL = "https://uselessfacts.jsph.pl/random.json?language=en";
  // Performing our AJAX GET request
  for (let i = 0; i < 14; i++) {
    $.ajax({
      url: factURL,
      method: "GET",
    })
      // After the data comes back from the API
      .then(function (response) {
        allFacts.push(response.text)
      })

  };
}

fact()
initCalendar();
//updateWeather();
//randomFact();
$('#zip').click(event => {
  calendar.clear()
  event.preventDefault()
  updateWeather($('#enterZipcode').val())
})
// initCalendar();
// updateWeather();


//Temperature arrays
var veryCold = ["freezing", "frigid", "polar", "snowy", "winter", "ice", "snow"];
var cold = ["brisk", "cold", "deadtree", "blanket"];
var mild = ["temperate", "sun", "nationalpark", "field", "flowers"];
var hot = ["warm", "humid", "tropical"];
var veryHot = ["blazing", "scorching", "sweltering", "fiery", "fire", "desert", "cactus"];

//Temperature range variable
var gifKeyword = "";

//Temperature function
function gifTemp(temp) {
  if (temp <= 32) {
    gifKeyword = veryCold[randomize(veryCold)];
  }
  else if (temp > 32 && temp <= 50) {
    gifKeyword = cold[randomize(cold)];
  }
  else if (temp > 50 && temp <= 65) {
    gifKeyword = mild[randomize(mild)];
  }
  else if (temp > 65 && temp <= 80) {
    gifKeyword = hot[randomize(hot)];
  }
  else {
    gifKeyword = veryHot[randomize(veryHot)];
  }
  console.log(gifKeyword);
  return gifKeyword
}

const getGif = term => {
  var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=ujM6Ecn7mLRcfW3A40Ss8UtOlWKu7fQk&q=" + term + "&limit=1";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    .then(function (response) {
      console.log(response.data[0].images.fixed_height_small.url)
      return response.data[0].images.fixed_height_small.url;
    })
}
function randomize(tempArray) {
  return Math.floor(Math.random() * tempArray.length);


}