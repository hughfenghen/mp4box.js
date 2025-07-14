BoxParser.vpcCBox.prototype.write = function (stream) {
	this.version = 1;
  const bodySize = 8 + this.codecIntializationDataSize;
  this.size = bodySize;

  this.writeHeader(stream); // write full box header: size + 'vpcC' + version + flags

  // version 1 writing (strict alignment spec)
  stream.writeUint8(this.profile); // profile (1 byte)
  stream.writeUint8(this.level);   // level (1 byte)

  // bitDepth (4 bits), chromaSubsampling (3 bits), videoFullRangeFlag (1 bit)
  let byte4 = (this.bitDepth << 4) |
              ((this.chromaSubsampling & 0x7) << 1) |
              (this.videoFullRangeFlag & 0x1);
  stream.writeUint8(byte4);

  stream.writeUint8(this.colourPrimaries);
  stream.writeUint8(this.transferCharacteristics);
  stream.writeUint8(this.matrixCoefficients);

  // codecInitializationDataSize + codecInitializationData
  stream.writeUint16(this.codecIntializationDataSize);
  if (this.codecIntializationDataSize > 0) {
    stream.writeUint8Array(this.codecIntializationData);
  }
};
