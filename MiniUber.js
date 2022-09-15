// we take the rider and driver as static objects 
const rider = {
    name: "ram",
    cordinateX: 1,
    cordinateY: 1,
};

const driver = {
    name: "shyam",
    availability: true,
    cordinateX: 12,
    cordinateY: 14,
};

// this is for one to one mapping between rider and driver rider: driver 
const riderDriverMapped = {}

// threshold above which ride cannot be taken if the distance between rider and driver is more than this 
const thresholdDistance = 17;


// methode to get distance btw two points 
const distanceBtwPoints = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}


// methode to check is booking possible based on thresold value 
const isBookingPossible = () => {
    const distanceBtwRiderDriver = distanceBtwPoints(driver.cordinateX, driver.cordinateY, rider.cordinateX, rider.cordinateY);
    console.log(`distance between rider and driver is ${distanceBtwRiderDriver}`);
    return distanceBtwRiderDriver < thresholdDistance;
}


// it is to start trip and return true or false if trip is possible or not 
const canStartTrip = () => {
    if (driver.availability  && isBookingPossible()) {
        driver.availability = false;
        return true;
    } else {
        return false;
    }
}

// it is to make our driver available to take ride
const makeDriverAvailable = (x, y) => {
    console.log(`Driver ${JSON.stringify(driver.name)} is made availble for ride`)
    driver.availability = true;
    driver.cordinateX = x;
    driver.cordinateY = y;
}

// it is to make our driver unavailable to take  ride
const makeDriverUnavailable = () => {
    console.log(`Driver ${JSON.stringify(driver.name)} is made unavailble for ride`);
    driver.availability = false;
}

//used to end trip and if the trip is ended succesfully it returns true 
const endTrip = () => {
    if(!driver.availability){ 
        makeDriverAvailable(driver.cordinateX, driver.cordinateY);
        return true;
    } else {
        return false;
    }
}

// main methode where we call our different methode to does they working fine or not 
function main() {
    console.log('----------------------------------');
    console.log(`rider: ${JSON.stringify(rider)} `);
    console.log(`driver: ${JSON.stringify(driver)} `);
    if(canStartTrip()){
        console.log(`trip is started `);
        riderDriverMapped[rider.name] = driver.name;
        console.log(`rider driver Mappings in starting a trip  ${JSON.stringify(riderDriverMapped)}`);
        console.log(`calling end Trip`);
        if(endTrip()) {
            delete riderDriverMapped[rider.name];
            console.log(`rider driver Mappings in ending a trip  ${JSON.stringify(riderDriverMapped)}`);
        }
    } else { // if the trip cannot be possible this else is run 
        console.log('trip is not available due to unavailablity of driver in your area');
    }
    makeDriverUnavailable(); // this is just to check our makeDriverUnavailable methode 
    console.log('----------------------------------');
}

main();