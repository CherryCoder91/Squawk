export class PeerMediaService {

    private configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };
    public readonly remoteStream: MediaStream = new MediaStream();
    private readonly peerConnection: RTCPeerConnection = new RTCPeerConnection(this.configuration);

    public constructor(
        private readonly localStream: MediaStream,
    ) {
        this.localStream.getTracks().forEach((track: any) => {
            this.peerConnection.addTrack(track, this.localStream);
        });

        this.peerConnection.ontrack = (event: any) => {
            event.streams[0].getTracks().forEach((track: any) => {
                this.remoteStream.addTrack(track);
            });
        };
    }

    public async createOffer(): Promise<RTCSessionDescription | null> {

            // this.peerConnection.onicecandidate = async (event: any) => {
            //     if (event.candidate) {
            //         const offerForPeer = this.peerConnection.localDescription;
            //         return offerForPeer;
            //     }
            // };

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        return this.peerConnection.localDescription;
    }

    public async createAnswer(offer: RTCSessionDescription): Promise<RTCSessionDescription | null> {

        // this.peerConnection.onicecandidate = async (event: any) => {
        //     if (event.candidate) {
        //         this.answerObjectString.set(JSON.stringify(this.peerConnection.localDescription));
        //     }
        // };

        await this.peerConnection.setRemoteDescription(offer);

        let answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        return this.peerConnection.localDescription;
    }

    public async addAnswer(answer: RTCSessionDescription): Promise<void> {
        if (!this.peerConnection.currentRemoteDescription) {
            await this.peerConnection.setRemoteDescription(answer);
        }
    }
}