// #include <ESP8266WiFi.h>
// #include <ESP8266WebServer.h>
// #include <Servo.h>

#define Servo1Pin 14 //D5
#define Servo2Pin 12 //D6
#define Servo3Pin 13 //D7
#define Servo4Pin 15 //D8
const int LED = 16; //GPI16 - D0

const char* ssid ="Salasphone";     //YOUR SSID
const char* password = "3baefd18e028";        //YOUR WIFI PASSWORD

int sc[]={180, 90, 0};

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

ESP8266WebServer server(80);

void up(){
  digitalWrite(LED,HIGH);
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
  servo4.attach(Servo4Pin);
  servo1.write(180);
  servo2.write(180);
  servo3.write(180);
  servo4.write(180);
  server.send(200, "text/plane","trying UP");
}

void down(){
  digitalWrite(LED,HIGH);
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
  servo4.attach(Servo4Pin);
  servo1.write(0);
  servo2.write(0);
  servo3.write(0);
  servo4.write(0);
  server.send(200, "text/plane","trying DOWN");
}
void left(){
  digitalWrite(LED,HIGH);
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
  servo4.attach(Servo4Pin);
  servo1.write(0);
  servo2.write(0);
  servo3.write(180);
  servo4.write(180);
  server.send(200, "text/plane","trying LEFT");
}
void right(){
  digitalWrite(LED,HIGH);
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
  servo4.attach(Servo4Pin);
  servo1.write(180);
  servo2.write(180);
  servo3.write(0);
  servo4.write(0);
  server.send(200, "text/plane","trying RIGHT ");
}
void alto(){
  digitalWrite(LED,HIGH);
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
  servo4.attach(Servo4Pin);
  servo1.write(95);
  servo2.write(95);
  servo3.write(95);
  servo4.write(95);
  server.send(200, "text/plane","trying servoUp");
}
void info() {
 server.send(200, "text/plain", "Hola mundo!");
}

void no_encontrado() {
 server.send(404,"text/plain","Error en la petición");
}

void setup() {
  //inicializa el puerto serie
  Serial.begin(115200);
  delay(10);
  pinMode(LED,OUTPUT);
  digitalWrite(LED,LOW);
  //inicializa el led
  servo1.attach(Servo1Pin);
  //Inicializa el módulo wifi
  WiFi.mode(WIFI_STA); //Establece el módulo como cliente wifi
  WiFi.disconnect(); //Se desconecta de cualquier WiFi conectado previamente
  Serial.println();  
  //conecta con la red wifi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {   // Espera por una conexión WiFi
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(LED,HIGH);
  //definimos los paths
  server.on("/up",up);    //al recivir /srv1 a traves de GET ejecuta handleServo
  server.on("/down",down);    //al recivir /srv1 a traves de GET ejecuta handleServo
  server.on("/left",left);    //al recivir /srv1 a traves de GET ejecuta handleServo
  server.on("/right",right);    //al recivir /srv1 a traves de GET ejecuta handleServo
   server.on("/stop",alto);    //al recivir /srv1 a traves de GET ejecuta handleServo
  
  server.onNotFound(no_encontrado);
  //inicializa el servidor web
  server.begin();
  Serial.println("Servidor HTTP activo");
}

void loop() {
  server.handleClient();
}