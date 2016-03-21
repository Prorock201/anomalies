
package com.chisw.xml;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


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
 *         &lt;element ref="{}Stream" maxOccurs="unbounded"/>
 *         &lt;element ref="{}Anomalies"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" use="required" type="{http://www.w3.org/2001/XMLSchema}NCName" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "stream",
    "anomalies"
})
@XmlRootElement(name = "LSResponse")
@Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
public class LSResponse {

    @XmlElement(name = "Stream", required = true)
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected List<Stream> stream;
    @XmlElement(name = "Anomalies", required = true)
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected Anomalies anomalies;
    @XmlAttribute(name = "type", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "NCName")
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    protected String type;

    /**
     * Gets the value of the stream property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the stream property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getStream().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Stream }
     * 
     * 
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public List<Stream> getStream() {
        if (stream == null) {
            stream = new ArrayList<Stream>();
        }
        return this.stream;
    }

    /**
     * Gets the value of the anomalies property.
     * 
     * @return
     *     possible object is
     *     {@link Anomalies }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public Anomalies getAnomalies() {
        return anomalies;
    }

    /**
     * Sets the value of the anomalies property.
     * 
     * @param value
     *     allowed object is
     *     {@link Anomalies }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public void setAnomalies(Anomalies value) {
        this.anomalies = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    @Generated(value = "com.sun.tools.internal.xjc.Driver", date = "2016-03-21T11:50:12+02:00", comments = "JAXB RI v2.2.8-b130911.1802")
    public void setType(String value) {
        this.type = value;
    }

}
