class Vec3 {
  constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
    return this
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    this.z += v.z
    return this
  }

  clone() {
    return new Vec3(this.x, this.y, this.z)
  }

  subtract(v) {
    this.x -= v.x
    this.y -= v.y
    this.z -= v.z
    return this
  }

  scale(s) {
    this.x = this.x * s
    this.y = this.y * s
    this.z = this.z * s
    return this
  }

  normalize() {
    var length = this.length()
    this.x = this.x / length
    this.y = this.y / length
    this.z = this.z / length
    return this
  }

  length() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    )
  }

  truncate(max) {
    var length = this.length()
    if (length > max) {
      this.x = (this.x * max) / length
      this.y = (this.y * max) / length
      this.z = (this.z * max) / length
    }
    return this
  }

  getAttributes() {
    return [this.x, this.y, this.z]
  }
}

export default Vec3
