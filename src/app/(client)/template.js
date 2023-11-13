"use client"
import React from 'react'
import { motion } from "framer-motion"

const template = ({ children }) => {
    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity:0 }} transition={{ duration: 1, type: 'spring' }}>
            {children}
        </motion.main>
    )
}

export default template