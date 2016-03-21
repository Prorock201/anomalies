
package com.chisw.xml;

import javax.annotation.Generated;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{}ID"/>
 *         &lt;element ref="{}Name"/>
 *         &lt;element ref="{}Image"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "id",
    "name",
    "image"
})
@XmlRootElement(name = "Stream")
@Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
public class Stream {

    @XmlElement(name = "ID", required = true)
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected String id;
    @XmlElement(name = "Name", required = true)
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected String name;
    @XmlElement(name = "Image", required = true)
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected Image image;

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public String getID() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public void setID(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the image property.
     * 
     * @return
     *     possible object is
     *     {@link Image }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public Image getImage() {
        return image;
    }

    /**
     * Sets the value of the image property.
     * 
     * @param value
     *     allowed object is
     *     {@link Image }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public void setImage(Image value) {
        this.image = value;
    }

}
