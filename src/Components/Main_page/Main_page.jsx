import {Container } from 'react-bootstrap';
import styles from './Main_page.module.css'
import './Main_page.css'
import Navigation_bar from "../Navigation_bar/Navigation_bar.jsx";

export default function Main_page ()
{
    return (
        <>
            <Container fluid
                       className="m-0 p-0"
            >
                <div className={styles.backgroundImage}></div>


                <div className="about_us">
                    <div className="about_us__columns">
                        <div className="column__left">
                            <div className="column__img">
                            </div>
                        </div>

                        <div className="column__right">
                            <div className="column__text">
                                <p> We live, breath and sleep two wheels. We race each season on and off the road. We
                                    ride
                                    thousands of km each year. We commute to work on bikes every day. We are not pro
                                    racers
                                    though. We admire the heritage of the great tours, but we can’t figure out who rides
                                    for
                                    which team these days.</p>
                                <br/><br/>
                                <p> We started RONDO because we wanted to create bikes for real cyclists, like us, and
                                    most
                                    probably like you. For people who have no time to waste on talking, and want to get
                                    straight to the point. People who love to kick everyone’s ass in the local race,
                                    beat
                                    their PR on a climb, but also do a relaxed gravel ride with their friends. We
                                    started
                                    RONDO because we wanted to create bikes, that are beautiful - technically and
                                    visually.
                                    Bikes that stand out from the crowd. We started RONDO because we wanted to change
                                    the
                                    way drop bar bikes are perceived both, roadies and mountain bikers. We absolutely
                                    love
                                    to watch the faces of our road racing friends when they hit the gravel for the first
                                    time, absolutely loving it. Or see our MTB buddies gleaming with joy like kids when
                                    they
                                    get on the drops and go full gas around their local trails.</p>
                                <br/><br/>
                                <p> With 15 years of experience in manufacturing bikes we put together a new team that
                                    includes the best industrial and graphic designers, engineers, riders, and
                                    experienced
                                    business managers. Here we are.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bike">
                    <div className="bike_fullscreen">
                        <div className="bike_mainblock">
                            <div className="bike_mainblock__content">
                                <div className="bike_checkout">
                                    <p>But enough talk. Check out the bikes yourselves.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Navigation_bar />

                <div className="footer_wrapper">
                    <p>&copy; 2025 Rondo. Все права защищены.</p>

                </div>
            </Container>


        </>

    )
}