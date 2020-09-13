import icqs_demo from 'ic:canisters/icqs_demo';

icqs_demo.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
