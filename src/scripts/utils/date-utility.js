const DateUtils = {
    calculateAge(birthDate) {
        if (!birthDate) return 'N/A';
        
        const birth = new Date(birthDate);
        const today = new Date();

        // Check if birthDate is valid
        if (isNaN(birth.getTime())) return 'Invalid date';

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get the last day of the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Build the age string
        const parts = [];
        
        if (years > 0) {
            parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        }
        
        if (months > 0) {
            parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        }
        
        if (days > 0) {
            parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        }

        // Handle edge case of newborn (0 years, 0 months, 0 days)
        if (parts.length === 0) {
            return 'Just born';
        }

        return parts.join(', ') + ' old';
    },

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Invalid date';

        // Format: DD Month YYYY
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
};

export default DateUtils;