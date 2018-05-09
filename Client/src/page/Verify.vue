<template>
    <v-app v-if="vGetLinkValidated">
        <main>
            <v-container fill-height>
                <v-layout row wrap align-center>
                    <v-flex xs12 md8 offset-md2>
                        <v-card class="elevation-5">
                            <v-card-title primary-title class="pa-2">
                                <v-layout row wrap align-center>
                                    <v-flex>
                                        <div class="headline green--text text--darken-3">EPS Annual Student Review</div>
                                        <div>
                                            <p>
                                                {{ vGetName }}, you must watch the following video to receive full internet access.
                                            </p>
                                            <p>
                                                Be sure to click the 'I AGREE TO THE TERMS AND CONDITIONS' button that will display after 
                                                you have watched the video. You will then need to click the 'Agree' button to complete this process.
                                            </p>
                                            <p>
                                                Failure to complete this process will result in your continued use of limited internet access.
                                            </p>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-card-text class="pa-0">
                                <v-card>
                                    <div :class="overlayClass" @click="videoOverlay">
                                        <div class="video-container">
                                            <video
                                                class="video"
                                                ref="video"
                                                style="width: 100%;"
                                                @loadedmetadata="metaChange"
                                                @timeupdate="timeChange"
                                                @ended="videoEnded"
                                                webkit-playsinline="true"
                                                playsinline="true">
                                                <source type="video/mp4" :src="getURL"></source>
                                            </video>
                                        </div>
                                    </div>
                                </v-card>
                                <v-card>
                                    <v-progress-linear
                                        :value="progress"
                                        class="my-0"
                                        color-front="blue"
                                        color-back="grey">
                                    </v-progress-linear>
                                </v-card>
                                <v-card class="pa-2" style="min-width: 320px;">
                                    <v-layout row class="pl-2" align-center wrap>
                                        <v-flex xs12 sm4 class="hidden-xs-only">
                                            <v-slider
                                                hide-details
                                                prepend-icon="volume_up"
                                                v-model="volume"
                                                class="pt-1"
                                                @click="volumeChange"
                                                ></v-slider>
                                        </v-flex>
                                        <v-flex sm4 class="text-xs-center">
                                            <v-chip label class="grey white--text">{{ getTime }}</v-chip>
                                        </v-flex>
                                        <v-flex sm4 class="text-xs-right">
                                            <div>
                                                <v-btn icon v-if="!playing && !videoFinished" @click="play">
                                                    <v-icon class="green--text text--darken-3">play_arrow</v-icon>
                                                </v-btn>
                                                <v-btn icon v-if="playing && !videoFinished" @click="pause">
                                                    <v-icon class="green--text text--darken-3">pause</v-icon>
                                                </v-btn>
                                                <v-btn icon :disabled="this.progress == 0" @click="replay">
                                                    <v-icon class="green--text text--darken-3">replay</v-icon>
                                                </v-btn>
                                                <v-btn icon @click="fullscreen" class="hidden-xs-only">
                                                    <v-icon class="green--text text--darken-3">fullscreen</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-card-text>
                            <v-card-actions v-if="showButton" class="pa-3">
                                <v-btn block class="green darken-3 white--text" @click.native.stop="dialog">I Agree to the terms and conditions</v-btn>
                                    <v-dialog v-model="showDialog" persistent>
                                        <v-card>
                                            <v-card-title class="headline">Agree to Terms and Conditions?</v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text>
                                                By clicking 'Agree' below, you acknowledge that you have watched the Annual Student Review video in its entirety and that you agree to the
                                                terms and conditions defined within the video.
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn class="green--text darken-1" flat="flat" @click.native="submitDisagree">Disagree</v-btn>
                                                <v-btn class="green--text darken-1" flat="flat" @click.native="submitAgree">Agree</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <v-snackbar v-model="notification"
            :success="notificationColor === 'success'"
            :info="notificationColor === 'info'"
            :warning="notificationColor === 'warning'"
            :error="notificationColor === 'error'"
        >
            {{ notificationText }}
            <v-btn dark flat @click.native="notification = false">Close</v-btn>    
        </v-snackbar>
    </v-app>
</template>

<style>
    .video-overlay {
        position: relative;
    }

    .video-overlay:before {
        font-size: 2rem;
        color: #fff;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .start:before {
        content: 'Click Play to start video'
    }

    .paused:before {
        content: 'Paused'
    }

    .video {
        padding-right: 0px;
        display: block;
        pointer-events: none;
    }

    video::-webkit-media-controls {
        display: none !important;
    }

    video::-moz-media-controls {
        display: none !important;
    }

    video::-ms-media-controls {
        display: none !important;
    }

    .application--light .input-group:not(.input-group--error) label {
        color: black;
    }

    .input-group.input-group--slider:not(.input-group--disabled).input-group--dirty .slider__track-fill
        , .input-group.input-group--slider.input-group--dirty .slider__thumb {
        background-color: #2e7d32;
        border-color: #2e7d32;
    }

    div#app.application.application--light {
        background-color: #73bf52;
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import SnackbarQueue from '.././mixins/snackbarQueue'

    export default {
        mixins: [SnackbarQueue],

        data() {
            return {
                showBtn: false,
                toggle: null,
                progress: 0,
                duration: 0,
                currentTime: 0,
                volume: 0,
                playing: false,
                showDialog: false
            }
        },

        watch: {
            progress: function() {
                if (this.videoFinished) {
                    this.showBtn = true
                }
            }
        },

        computed: {
            currentVolume: function() {
                return this.$refs.video.volume
            },

            getTime: function() {
                return this.convertSecsToTime(this.currentTime) + ' / ' + this.convertSecsToTime(Math.round(this.duration))
            },

            getURL: function() {
                // return 'https://drive.google.com/open?id=1ncdHuQurY29Fk0aOAij02IhdccreM7Za'
                return '/src/static/videos/' + process.env.VIDEO_FILENAME
            },

            overlayClass: function() {
                return {
                    'video-overlay': this.playing == false,
                    'start': this.progress == 0,
                    'paused': this.playing == false && this.progress !== 0
                }
            },

            overlayText: function() {
                return this.progress == 0 ? 'Press Play to start video' : 'Paused' 
            },

            showButton: function() {
                return this.showBtn || this.vGetWatched
            },

            videoFinished: function() {
                return this.progress == 100 && this.$refs.video.ended
            },

            ...mapGetters({
                vGetLinkValidated: 'getLinkValidated',
                vGetName: 'getName',
                vGetWatched: 'getWatched'
            })
        },

        methods: {
            convertSecsToTime(secs) {
                let sec_num = parseInt(secs, 10)
                let hours = Math.floor(sec_num / 3600) % 24
                let minutes = Math.floor(sec_num / 60) % 60
                let seconds = sec_num % 60

                return [hours,minutes,seconds]
                    .map(v => v < 10 ? "0" + v : v)
                    .filter((v,i) => v !== "00" || i > 0)
                    .join(":")
            },

            dialog() {
                this.message = null;
                this.showDialog = true;
            },

            fullscreen() {
                let video = this.$refs.video
                if (video.requestFullscreen) {
                    video.requestFullscreen()
                } else if (video.msRequestFullScreen) {
                    video.msRequestFullscreen()
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen() // Firefox
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen() // Chrome and Safari
                }
            },

            metaChange() {
                this.volume = this.$refs.video.volume * 100
                this.duration = this.$refs.video.duration
            },

            pause() {
                this.$refs.video.pause()
                this.playing = !this.playing
            },

            play() {
                this.$refs.video.play()
                this.playing = !this.playing
            },

            replay() {
                this.progress = 0
                this.playing = true

                let video = this.$refs.video
                video.currentTime = 0
                video.play()
            },

            submitAgree() {
                this.showDialog = false

                let params = {
                    key: this.$route.params.key
                }

                this.$http.post('/accept', params)
                .then(response => {
                    if (response.status === 200 && response.data.success) {
                        this.$router.push('/success')
                    } else {
                        this.$store.dispatch('setError', 'The url you provided is not valid or you have previously accepted the Annual Student Review.')
                        this.$router.push('/error')
                    }
                }, error => {
                    this.addNotification('Sorry, unable to connect to the server. Try again later!', 'info')
                });
            },

            submitDisagree () {
                this.showDialog = false
                this.addNotification('You will not receive full internet access until you accept the terms and conditions.', 'error')
            },

            timeChange() {
                this.currentTime = this.$refs.video.currentTime
                this.progress = (this.currentTime / this.duration) * 100
            },

            updateWatched() {
                let params = {
                    key: this.$route.params.key
                }

                this.$http.post('/watched', params)
                .then(response => {
                    if (response.status === 200 && response.data.success) {
                        this.showBtn = true
                    }
                }).catch(error => {
                    //Don't care if it failed. They can re-watch video if they backed out
                });
            },

            videoEnded() {
                if (!this.getVideoWatched) {
                    this.updateWatched()
                }
            },
            
            videoOverlay() {
                if (this.playing)
                    this.pause()
                else
                    this.play()
            },

            volumeChange() {
                this.$refs.video.volume = (this.volume / 100)
            }
        }
    }
</script>