/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  Animated,
  Keyboard,
  TouchableNativeFeedback,
  Image
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, ProviderPropType} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import Geolocation from '@react-native-community/geolocation';

import DestinationBottom from './component/DestinationBottom';

import SelectBottom from './component/Select';

import OrderBottom from './component/OrderBottom';

import FindingDriver from './component/FindingDriver';

import mapStyle from './utils/mapstyle';

import DriverPickup from './component/DriverPickup';

import backIcon from './asset/image/arrow.png';

import RatingComponent from './component/Rating';

import Car from './asset/image/car.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.destRef = React.createRef();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  state = {
    coordinateValue: null,
    currentLocation: {},
    destinationValue: '',
    destinationStat: false,
    destinationTyping: false,
    pickValue: '',
    pickStat: false,
    process: 0,
    center: null,
    notesTyping: false,
    notes: '',
    notesFilled: false,
    showRide: false,
    showPayment: false,
    showChat: false,
    chatTyping: false,
    destSuggest: [],
    pickSuggest: [],
    which: 'dest',
    destSelected: {},
    pickSelected: {},
    mapTemp: {},
    dataMapTemp: [],
    pickSuggestSelected: 0,
    price: 0,
    duration: 0,
    distance: 0,
    rideSelected: {},
    paymentMethod: 'cash',
    nearbyDrivers: [],
    standardPrice: {},
    orderId: null,
    waypoint: null,
    driverData: {},
    text: 'picking up you',
    star: 5,
    advice: {
      adv10: false,
      adv11: false,
      adv12: false,
      adv20: false,
      adv21: false,
      adv22: false,
    }
  }

  onMapPress = (coordinate) => {
    this.setState({
      coordinateValue: coordinate
    })
  }

  async animateCamera() {
    const camera = await this.map.getCamera();
    camera.zoom = 17;
    camera.center.latitude = this.state.currentLocation.latitude;
    camera.center.longitude = this.state.currentLocation.longitude;
    this.map.animateCamera(camera, { duration: 2000 });
  }



  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(async(info) => {
      const currentLocation = this.state.currentLocation;
      currentLocation.latitude = info.coords.latitude;
      currentLocation.longitude = info.coords.longitude;
      currentLocation.latitudeDelta = 0.0922;
      currentLocation.longitudeDelta = 0.0421;
      this.setState({ currentLocation });

      // const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=&location=' + currentLocation.latitude + ',' + currentLocation.longitude + '&radius=10&key=process.env.APIKEY';
      const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/nearby-location'
      console.log(currentLocation)
      const req = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        })
      })
      const res = await req.json()
      // console.log(res.maps[0])
      // res = JSON.parse(res).maps
      // console.log(url)
      // console.log('xxxxx')
      // console.log(res.maps)
      const slice = res.maps.slice(0, 5)
      // console.log(slice)
      let idx = 0
      this.setState({ dataMapTemp: [...slice] })
      if(slice.length > 0) {
        if(slice.length > 1) {
          idx = 1
        }
        else {
          idx = 0
        }
        this.setState({ 
          pickSelected: {...slice[idx]},
          pickValue: slice[idx].name,
        })
      }
      this.getNearbyDriver(currentLocation.latitude, currentLocation.longitude)
    })
    this.onMapPress(this.state.currentLocation)
  }

  destChangedHandler = async (text) => {
    this.setState({ destinationValue: text })
    if(text) {
      this.setState({ destinationStat: true})
      this.setState({ destSuggest: [] })
      if(text.length > 2) {
        // const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + text + '&radius=50000&key=process.env.APIKEY';
        const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/text-search'
        const req = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            ...this.state.currentLocation
          })
        })
        const res = await req.json()
        console.log(url)
        this.setState({ destSuggest: res.maps.slice(0, 5) })
      }
    } else {
      this.setState({ destinationStat: false})
    }
  }

  pickChangedHandler = async (text) => {
    this.setState({ pickValue: text })
    if(text) {
      this.setState({ pickStat: true})
      this.setState({ pickSuggest: [] })
      if(text.length > 3) {
        const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/text-search'
        const req = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            ...this.state.currentLocation
          })
        })
        const res = await req.json()
        console.log(url)
        this.setState({ pickSuggest: res.maps.slice(0, 5) })
      }
    } else {
      this.setState({ pickStat: false})
    }
  }

  insertOrder = async () => {
    let cost = this.state.price
    switch(this.state.rideSelected.key) {
      case "0":
        cost += this.state.standardPrice.price_gocar
        break
      case "1":
        cost += this.state.standardPrice.price_gocar_L
        break
      case "2":
        cost += this.state.standardPrice.price_gride
        break
      case "3":
        cost += this.state.standardPrice.price_blue_bird
        break
      default:
        cost += this.state.standardPrice.price_gocar
        break
    }

    const xxxx = {notes: this.state.notes,
      payment_method: this.state.paymentMethod,
      cost,
      distance: this.state.distance,
      pickup_latlng: {
        latitude: this.state.pickSelected.geometry.location.lat,
        longitude: this.state.pickSelected.geometry.location.lng
      },
      destination_latlng: {
        latitude: this.state.destSelected.geometry.location.lat,
        longitude: this.state.destSelected.geometry.location.lng
      },
      identity_card: this.state.nearbyDrivers[0].id}
    console.log(xxxx)

    let url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/order/insert'
    let req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: this.state.notes ? this.state.notes : '-',
        payment_method: this.state.paymentMethod,
        cost,
        distance: this.state.distance,
        pickup_latlng: {
          latitude: this.state.pickSelected.geometry.location.lat,
          longitude: this.state.pickSelected.geometry.location.lng
        },
        destination_latlng: {
          latitude: this.state.destSelected.geometry.location.lat,
          longitude: this.state.destSelected.geometry.location.lng
        },
        identity_card: this.state.nearbyDrivers[0].id
      })
    })
    let res = await req.json()
    console.log(res)
    this.setState({ orderId: res.id })

    url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/driver/update-status'
    req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity_card: this.state.nearbyDrivers[0].id,
        stat: 1
      })
    })
    res = await req.json()
  }

  plusProcessHandler = async () => {
    if(this.state.process === 2) {
      console.log('keduaxxx')
      console.log(Object.keys(this.state.rideSelected).length)
      if(Object.keys(this.state.rideSelected).length > 0) {
        console.log(this.state.pickSelected.geometry.location)
        await this.getNearbyDriver(this.state.pickSelected.geometry.location.lat, this.state.pickSelected.geometry.location.lng)
        await this.getDriverData()
        console.log(this.state.nearbyDrivers)
        if(this.state.nearbyDrivers.length > 0) {
          await this.insertOrder()
        }
        this.setState((prev) => ({ process: prev.process + 1 }))
        setTimeout(async () => {
          if(this.state.nearbyDrivers.length > 0) {
            this.setState((prev) => ({ process: prev.process + 1 }))
          } else {
            this.setState((prev) => ({ process: prev.process - 1 }))
            await this.reset()
          }
        }, 6000)
      }
    } else {
      this.setState((prev) => ({ process: prev.process + 1 }))
    }
    // console.log('aaaa')
    // console.log(this.state.process)
    // this.setState((prev) => ({ process: prev.process + 1 }))
    // console.log(this.state.process)
  }

  minusProcessHandler = () => {
    console.log('aaaa')
    console.log(this.state.process)
    this.setState((prev) => ({ process: prev.process - 1 }))
    console.log(this.state.process)
  }

  notesChangedHandler = (text) => {
    this.setState({ notes: text, notesFilled: text ? true : false })
  }

  rideChangedHandler = () => {
    this.setState((prev) => ({ showRide: !prev.showRide }))
  }

  paymentChangedHandler = () => {
    console.log(this.state.showPayment)
    this.setState((prev) => ({ showPayment: !prev.showPayment }))
  }

  chatHandler = () => {
    this.setState((prev) => ({ showChat: !prev.showChat }))
  }

  destinationTypingHandler = () => {
    console.log('aaaaa')
    this.setState((prev) => ({ destinationTyping: !prev.destinationTyping }))
  }

  whichHandler = (which) => {
    console.log(which)
    this.setState({ which })
  }

  selectedHandler = async(value) => {
    if(this.state.which === 'dest') {
      this.setState({ 
        destSelected: {...value},
        destinationValue: value.name,
        process: 2
      })
    } else if(this.state.which === 'pickup') {
      this.setState({ 
        pickSelected: {...value},
        pickValue: value.name
      })

      const camera = await this.map.getCamera();
      camera.zoom = 17;
      camera.center.latitude = value.geometry.location.lat;
      camera.center.longitude = value.geometry.location.lng;
      this.getNearbyDriver(value.geometry.location.lat, value.geometry.location.lng)
      this.map.animateCamera(camera, { duration: 2000 });
    }
  }

  regionChangeHandler = (lat, lng) => {
    if(this.state.process === 1) {
      const temp = {
        latitude: lat,
        longitude: lng
      }
      this.setState({ mapTemp: {...temp}})
    }
  }

  onTouchEndHandler = async() => {
    if(this.state.process === 1) {
      const loc = this.state.mapTemp;
      // const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=&location=' + loc.latitude + ',' + loc.longitude + '&radius=10&key=process.env.APIKEY';
      const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/nearby-location'
      const req = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: loc.latitude,
          longitude: loc.longitude
        })
      })
      const res = await req.json()
      console.log(url)
      console.log(res.maps[0])
      const slice = res.maps.slice(0, 5)
      this.setState({ dataMapTemp: [...slice] })
      if(this.state.which === 'pickup') {
        this.getNearbyDriver(loc.latitude, loc.longitude)
      }
    }
  }

  getPrice = async () => {
    const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/utility/price'
    const req = await fetch(url)
    const res = await req.json()
    console.log(res)
    this.setState({ standardPrice: { ...res }})
  }

  setLocationHandler = () => {
    const temp = this.state.dataMapTemp;
    if(this.state.which === 'dest') {
      this.setState({ 
        destSelected: {...temp[1]},
        destinationValue: temp[1].name,
        process: 2
      })
      this.getPrice()
    } else if(this.state.which === 'pickup') {
      let idx = this.state.pickSuggestSelected
      if(temp.length > 1) {
        idx += 1
      }
      console.log('abcdef')
      console.log(temp[idx])
      this.setState({ 
        pickSelected: {...temp[idx]},
        pickValue: temp[idx].name,
        process: 0
      })
    }
  }

  pickSuggestHandler = async (idx) => {
    const temp = this.state.dataMapTemp;
    const location = temp[idx].geometry.location
    this.setState({ pickSuggestSelected: idx })

    const camera = await this.map.getCamera();
    camera.zoom = 17;
    camera.center.latitude = location.lat;
    camera.center.longitude = location.lng;
    this.map.animateCamera(camera, { duration: 500 });
  }

  autoFillHandler = async() => {
    if(!this.state.pickValue) {
      const currentLocation = this.state.currentLocation
      // const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=&location=' + currentLocation.latitude + ',' + currentLocation.longitude + '&radius=10&key=process.env.APIKEY';
      const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/nearby-location'
      const req = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.state.currentLocation
        }),
      })
      const res = await req.json()
      console.log(url)
      const slice = res.maps.slice(0, 5)
      console.log('xxxxxx')
      console.log(slice)
      let idx = 0
      this.setState({ dataMapTemp: [...slice] })
      if(slice.length > 0) {
        if(slice.length > 1) {
          idx = 1
        }
        else {
          idx = 0
        }
        this.setState({ 
          pickSelected: {...slice[idx]},
          pickValue: slice[idx].name,
        })
      }
      this.getNearbyDriver(currentLocation.latitude, currentLocation.longitude)
    }
  }

  onReadyHandler = async (info) => {
    await this.getPrice()
    
    if(this.state.process === 2) {
      // console.log("wowowowowoiiiiii")
      // console.log(this.state.standardPrice)
      this.setState({
        price: this.state.standardPrice.price_per_km * info.distance,
        duration: info.duration,
        distance: info.distance
      })
      
      const center = { ...info.coordinates[parseInt(info.coordinates.length / 2)] }

      const camera = await this.map.getCamera();
      camera.zoom = 13;
      // console.log(parseInt(info.coordinates.length / 2))
      // console.log(info.coordinates)
      camera.center.latitude = center.latitude;
      camera.center.longitude = center.longitude;
      this.map.animateCamera(camera, { duration: 2000 });
    }
  }

  rideSelectedHandler = (item) => {
    console.log(item)
    this.setState({ rideSelected: {...item} })
  }

  paymentMethodHandler = (method) => {
    this.setState({ 
      paymentMethod: method,
      showPayment: false
    })
  }

  getNearbyDriver = async (latitude, longitude) => {
    const lat_lng = {
      latitude,
      longitude
    }
    // console.log(lat_lng)
    const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/maps/nearby-driver';
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lat_lng)
    })
    const res = await req.json()
    console.log(res)
    const nearbyDrivers = [...res.drivers]
    this.setState({ nearbyDrivers })
  }

  reset = async () => {
    if(this.state.process === 3) {
      const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/order/cancel'
      // console.log(currentLocation)
      const req = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.orderId
        })
      })
      const res = await req.json()
    }

    this.setState({
      coordinateValue: null,
      // currentLocation: {},
      destinationValue: '',
      destinationStat: false,
      destinationTyping: false,
      pickValue: '',
      pickStat: false,
      process: 0,
      center: null,
      notesTyping: false,
      notes: '',
      notesFilled: false,
      showRide: false,
      showPayment: false,
      showChat: false,
      chatTyping: false,
      destSuggest: [],
      pickSuggest: [],
      which: 'dest',
      destSelected: {},
      pickSelected: {},
      mapTemp: {},
      dataMapTemp: [],
      pickSuggestSelected: 0,
      price: 0,
      duration: 0,
      distance: 0,
      rideSelected: {},
      paymentMethod: 'cash',
      nearbyDrivers: [],
      standardPrice: {},
      orderId: null,
      waypoint: null,
      driverData: {},
      text: 'picking up you',
      start: 5,
      advice: {
        adv10: false,
        adv11: false,
        adv12: false,
        adv20: false,
        adv21: false,
        adv22: false,
      }
    })

    await this.autoFillHandler()
    this.animateCamera()
  }

  setDriverStatus = async () => {
    let url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/order/arrived'
    let req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.orderId
      })
    })

    url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/driver/update-status'
    req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity_card: this.state.nearbyDrivers[0].id,
        stat: 0
      })
    })

    url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/driver/update-trip'
    req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity_card: this.state.nearbyDrivers[0].id,
        latitude: this.state.destSelected.geometry.location.lat,
        longitude: this.state.destSelected.geometry.location.lng
      })
    })
  }

  driverPickupHandler = async (info) => {
    console.log(info)
    let timeAvg = (info.coordinates.length * 1000) / info.duration
    const temp = timeAvg
    console.log(timeAvg)

    this.setState({
      waypoint: <Marker
        coordinate={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: info.coordinates[0].latitude,
          longitude: info.coordinates[0].longitude
      }}>
        <View>
          <Image
            style={{
              width: 30,
              height: 30
            }} 
            source={Car} />
        </View>
      </Marker>
    })

    let camera = await this.map.getCamera();
    camera.zoom = 17;
    camera.center.latitude = info.coordinates[0].latitude;
    camera.center.longitude = info.coordinates[0].longitude;
    this.map.animateCamera(camera, { duration: 300 });
    for (let i = 1; i < info.coordinates.length; i++) {
      setTimeout(async () => {
        console.log("haloooo lup")
        camera = await this.map.getCamera();
        camera.center.latitude = info.coordinates[i].latitude;
        camera.center.longitude = info.coordinates[i].longitude;
        this.map.animateCamera(camera, { duration: 300 });

        this.setState({
          waypoint: <Marker 
            key={i}
            coordinate={{
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: info.coordinates[i].latitude,
              longitude: info.coordinates[i].longitude
          }}>
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30
                }} 
                source={Car} />
            </View>
          </Marker>
        })

        if(i === info.coordinates.length - 1) {
          this.plusProcessHandler()
        }

        if(this.state.process === 5) {
          const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/order/otw'
          const req = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.orderId
            })
          })
          this.setState({ text: 'together with you' })
        } else if(this.state.process === 6) {
          this.setDriverStatus()
        }
      }, timeAvg)
      timeAvg += temp
    }
  }

  getDriverData = async () => {
    const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/driver/' + this.state.nearbyDrivers[0].id
    const req = await fetch(url)
    const res = await req.json()
    console.log(url)
    console.log(res)
    this.setState({ driverData: { ...res.drivers } })
  }

  adviceSelectedHandler = (idx) => {
    const advice = { ...this.state.advice }
    advice[idx] = !advice[idx]
    this.setState({
      advice: { ...advice }
    })
  }

  starChangedHandler = (i) => {
    console.log(5 - i)
    this.setState({ star: 5 - i })
  }

  submitRatingHandler = async () => {
    console.log('ini submit')
    const url = 'https://9kxy1puzb4.execute-api.us-east-1.amazonaws.com/gocar/api/v2/driver/update-rating'
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity_card: this.state.nearbyDrivers[0].id,
        rating: this.state.star
      })
    })
  }

  componentDidMount() {
    this.getCurrentLocation();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    console.log('didshow')
    this.setState({ destinationTyping: true })
    if(this.state.process == 1) {
      this.setState({ notesTyping: true })
    } else if(this.state.process == 4) {
      this.setState({ chatTyping: true })
    }
  }

  _keyboardDidHide () {
    console.log('didhide')
    this.setState({ destinationTyping: false })
    if(this.state.process == 1) {
      this.setState({ notesTyping: false })
    } else if(this.state.process == 4) {
      this.setState({ chatTyping: false })
    }
  }


  render() {
    let pickMarker = null;
    let destMarker = null;
    let marker2 = null;

    if(Object.keys(this.state.pickSelected).length > 0) {
      pickMarker = <Marker
        coordinate={
        {
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: this.state.pickSelected.geometry.location.lat,
          longitude: this.state.pickSelected.geometry.location.lng,
        }}>
          <View
            style={{
              width: 50,
              height: 60,
              alignItems: 'center'
            }}>
            <View 
              style={{
                backgroundColor: '#4990e2',
                width: 50,
                height: 50,
                borderRadius: 300,
                borderWidth: 3,
                borderColor: '#fff'
              }}/>
            <View 
              style={{
                width: 4,
                height: 10,
                backgroundColor: '#000'
              }}/>
          </View>
        </Marker>
    }

    let nearbyDrivers = [];
    if(this.state.process <= 2) {
      this.state.nearbyDrivers.map((value, idx) => nearbyDrivers.push(
        <Marker 
          key={idx}
          coordinate={{
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            latitude: value.lat_lng.latitude,
            longitude: value.lat_lng.longitude
          }}>
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30
                }} 
                source={Car} />
            </View>
          </Marker>
      ))
    }

    if(Object.keys(this.state.destSelected).length > 0) {
      destMarker = <Marker
        pinColor={'#000000'}
        coordinate={
          {latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: this.state.destSelected.geometry.location.lat,
          longitude: this.state.destSelected.geometry.location.lng,
        }}>
          <View
            style={{
              width: 50,
              height: 60,
              alignItems: 'center'
            }}>
            <View 
              style={{
                backgroundColor: '#f6ae3b',
                width: 50,
                height: 50,
                borderRadius: 300,
                borderWidth: 3,
                borderColor: '#fff'
              }}/>
            <View 
              style={{
                width: 4,
                height: 10,
                backgroundColor: '#000'
              }}/>
          </View>
        </Marker>
    }

    let direction = null;
    if(Object.keys(this.state.destSelected).length > 0 && Object.keys(this.state.pickSelected).length > 0)  {
      direction = <MapViewDirections 
        origin={{ latitude: this.state.pickSelected.geometry.location.lat, longitude: this.state.pickSelected.geometry.location.lng}}
        destination={{ latitude: this.state.destSelected.geometry.location.lat, longitude: this.state.destSelected.geometry.location.lng}}
        apikey={'process.env.APIKEY'}
        strokeWidth={4}
        strokeColor="#4ba552"
        onReady={info => this.onReadyHandler(info)}/>
    }

    if(this.state.process === 4) {
      direction = <MapViewDirections 
      origin={{ latitude: this.state.nearbyDrivers[0].lat_lng.latitude, longitude: this.state.nearbyDrivers[0].lat_lng.longitude}}
      destination={{ latitude: this.state.pickSelected.geometry.location.lat, longitude: this.state.pickSelected.geometry.location.lng}}
      apikey={'process.env.APIKEY'}
      strokeWidth={4}
      strokeColor="#4ba552"
      onReady={info => this.driverPickupHandler(info)}/>
    }

    if(this.state.process === 5) {
      direction = <MapViewDirections 
      destination={{ latitude: this.state.destSelected.geometry.location.lat, longitude: this.state.destSelected.geometry.location.lng}}
      origin={{ latitude: this.state.pickSelected.geometry.location.lat, longitude: this.state.pickSelected.geometry.location.lng}}
      apikey={'process.env.APIKEY'}
      strokeWidth={4}
      strokeColor="#4ba552"
      onReady={info => this.driverPickupHandler(info)}/>
    }

    // if(this.state.process == 0 && this.state.coordinateValue && Object.keys(this.state.coordinateValue).length != 0) {
    //   marker = (<Marker
    //     coordinate={this.state.coordinateValue}
    //   />)
    // }

    if(this.state.process == 1) {
      marker2 = <View style={{
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
        width: 10,
        height: 10,
        position: 'absolute',
        top: '43%',
        right: '50%',
        backgroundColor: '#000',
        margin: 'auto'
      }} />
    }

    let obj = null;
    let backButton = null;
    switch(this.state.process) {
      case 0:
        obj = <DestinationBottom 
          destinationTyping={this.state.destinationTyping}
          pickStat={this.state.pickStat}
          pickValue={this.state.pickValue}
          destinationStat={this.state.destinationStat}
          destinationValue={this.state.destinationValue}
          pickChanged={this.pickChangedHandler}
          destChanged={this.destChangedHandler}
          changeProcess={this.plusProcessHandler}
          destSuggest={this.state.destSuggest}
          pickSuggest={this.state.pickSuggest}
          closed={this.destinationTypingHandler}
          changeWhich={this.whichHandler}
          selected={this.selectedHandler}
          which={this.state.which}       
          autoFill={this.autoFillHandler}/>
        break;
      case 1:
        let title = 'loading'
        let description = 'loading'
        if(this.state.dataMapTemp.length > 0) {
          if(this.state.dataMapTemp.length > 1) {
            title = this.state.dataMapTemp[1].name
            description = this.state.dataMapTemp[1].vicinity
          } else {
            title = this.state.dataMapTemp[0].name
            description = this.state.dataMapTemp[0].vicinity
          }
        }
        let data = this.state.dataMapTemp.length <= 1 ? this.state.dataMapTemp : this.state.dataMapTemp.slice(1,5)
        obj = <SelectBottom
          which={this.state.which}
          notesTyping={this.state.notesTyping}
          notesChanged={this.notesChangedHandler}
          notes={this.state.notes}
          notesFilled={this.state.notesFilled}
          edit={this.minusProcessHandler}
          setLocation={this.setLocationHandler}
          title={title}
          description={description}
          data={data}
          clicked={this.pickSuggestHandler}
        />
        backButton = <TouchableNativeFeedback onPress={this.minusProcessHandler}>
        <View style={{
          position: 'absolute',
          top: this.state.which === 'dest' ? '63%' : '40%',
          borderRadius: 20,
          backgroundColor: '#fff',
          marginStart: 16,
          padding: 8
      }}>
        <Image
          style={{
              width: 20,
              height: 20,
          }}
          source={backIcon}/>
        </View>
      </TouchableNativeFeedback>
        break;
      case 2:
        obj = <OrderBottom 
          showRide={this.state.showRide}
          changed={this.rideChangedHandler}
          showPayment={this.state.showPayment}
          paymentChanged={this.paymentChangedHandler}
          price={this.state.price}
          duration={this.state.duration}
          pick={this.state.pickSelected.name}
          dest={this.state.destSelected.name}
          clicked={this.minusProcessHandler}
          rideChanged={this.rideSelectedHandler}
          rideSelected={this.state.rideSelected}
          changePaymentMethod={this.paymentMethodHandler}
          paymentMethod={this.state.paymentMethod}
          standardPrice={this.state.standardPrice}
          nextProcess={this.plusProcessHandler}/>
        
          backButton = <TouchableNativeFeedback onPress={this.minusProcessHandler}>
            <View style={{
              position: 'absolute',
              top: '40%',
              borderRadius: 20,
              backgroundColor: '#fff',
              marginStart: 16,
              padding: 8
          }}>
            <Image
              style={{
                  width: 20,
                  height: 20,
              }}
              source={backIcon}/>
            </View>
          </TouchableNativeFeedback>
        break;
      case 3:
        obj = <FindingDriver 
          reset={this.reset}/>
        break;
      case 4:
        // obj = <DriverPickup 
        //   showChat={this.state.showChat}
        //   changed={this.chatHandler}
        //   chatTyping={this.state.chatT yping}
        //   dataDriver={this.state.driverData}
        //   text={this.state.text}/>
        // break;
      case 5:
          obj = <DriverPickup 
          showChat={this.state.showChat}
          changed={this.chatHandler}
          chatTyping={this.state.chatTyping}
          dataDriver={this.state.driverData}
          text={this.state.text}/>
        break;
      case 6:
        let cost = this.state.price
        switch(this.state.rideSelected.key) {
          case "0":
            cost += this.state.standardPrice.price_gocar
            break
          case "1":
            cost += this.state.standardPrice.price_gocar_L
            break
          case "2":
            cost += this.state.standardPrice.price_gride
            break
          case "3":
            cost += this.state.standardPrice.price_blue_bird
            break
          default:
            cost += this.state.standardPrice.price_gocar
            break
        }

        obj = <RatingComponent 
          star={this.state.star}
          changeStar={this.starChangedHandler}
          advice={this.state.advice}
          adviceSelected={this.adviceSelectedHandler}
          submit={this.submitRatingHandler}
          dataDriver={this.state.driverData}
          rideSelected={this.state.rideSelected}
          cost={cost}
          paymentMethod={this.state.paymentMethod}/>
        break;
      default:
        obj = <DestinationBottom 
          destinationTyping={this.state.destinationTyping}
          pickStat={this.state.pickStat}
          pickValue={this.state.pickValue}
          destinationStat={this.state.destinationStat}
          destinationValue={this.state.destinationValue}
          pickChanged={this.pickChangedHandler}
          destChanged={this.destChangedHandler}
          changeProcess={this.plusProcessHandler}
          destSuggest={this.state.destSuggest}
          closed={this.destinationTypingHandler}
          changeWhich={this.whichHandler}
        />
        break
    }

    let height = 0;
    switch(this.state.process) {
      case 0:
        height = Dimensions.get('window').height / 2
        break;
      case 1:
        height = Dimensions.get('window').height / 1.2
        break;
      case 2:
        height = Dimensions.get('window').height / 2
        break;
      case 3:
      case 4:  
      case 5:
        height = Dimensions.get('window').height
        break;
      default:
        height = Dimensions.get('window').height / 2
        break;
    }

    const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      backgroundColor: '#ffffff',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height,
      backgroundColor: 'rgba(0,0,0,0.9)'
    },
    });

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          customMapStyle={mapStyle}
          showsUserLocation={true}
          provider={this.props.provider}
          ref={map => {this.map = map}}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          onPress={(event) => {
            this.onMapPress(event.nativeEvent.coordinate)
          }}
          onMapReady={() => {
            this.animateCamera();
          }}
          onRegionChange={e => {
            this.regionChangeHandler(e.latitude, e.longitude)
          }}
          onTouchEnd={this.onTouchEndHandler}
        >
          {pickMarker}
          {destMarker}
          {nearbyDrivers}
          {this.state.waypoint}
          {direction}
          </MapView>
        {backButton}
        {obj}
        {marker2}
      </SafeAreaView>
    );
  };
};

App.propTypes = {
  provider: ProviderPropType,
};

export default App;
